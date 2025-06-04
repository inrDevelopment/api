import * as jobs from "../../tasks"
import Core from "./Core"
import { taskControl, TaskStatus } from "./typing"

export default class {
  private tasks: taskControl[] = []
  private concurrency: number
  private currentWorkers: number = 0
  private taskTimestamps: Record<string, number[]> = {}
  private core: Core

  constructor(concurrency: number = 3) {
    this.concurrency = concurrency
    this.core = new Core()
  }

  async add(taskName: string, payload: any): Promise<void> {
    try {
      const job = jobs[taskName as keyof typeof jobs]

      const saved = await this.core.saveTask({
        name: taskName,
        retries: 0,
        priority: job.priority ?? 1,
        maxRetries: job.maxRetries ?? 2,
        rateLimit: job.rateLimit ?? 5,
        payload: payload
      })

      this.tasks.push(saved)
      this.sort()
      this.process()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  private sort() {
    this.tasks.sort((a, b) => a.priority - b.priority)
  }

  private canExecuteNow(taskName: string): boolean {
    try {
      const now = Date.now()
      const limit = jobs[taskName as keyof typeof jobs].rateLimit ?? Infinity

      if (!this.taskTimestamps[taskName]) this.taskTimestamps[taskName] = []

      this.taskTimestamps[taskName] = this.taskTimestamps[taskName].filter(
        ts => now - ts < 1000
      )

      return this.taskTimestamps[taskName].length < limit
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  private async waitForRateLimit(taskName: string): Promise<void> {
    while (!this.canExecuteNow(taskName)) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  private registerExecution(taskName: string): void {
    if (!this.taskTimestamps[taskName]) this.taskTimestamps[taskName] = []

    this.taskTimestamps[taskName].push(Date.now())
  }

  private async process(): Promise<void> {
    try {
      while (this.currentWorkers < this.concurrency && this.tasks.length > 0) {
        const task = this.tasks.shift()
        if (!task) continue

        await this.waitForRateLimit(task.name)

        this.currentWorkers++
        await this.core.markAsProcessing(task.id)

        this.registerExecution(task.name)

        this.execute(task)
          .then(() => this.core.markAsDone(task.id))
          .catch(async () => {
            await this.core.incrementRetries(task.id)

            if (task.retries + 1 >= task.maxRetries) {
              await this.core.markAsFailed(task.id)
            } else {
              task.retries++
              this.tasks.push({ ...task, status: TaskStatus.PENDING })
              this.sort()
            }
          })
          .finally(() => {
            this.currentWorkers--
            this.process()
          })
      }
    } catch (error: any) {
      console.log("Erro ao processar a tarefa.")

      throw new Error(error.message)
    }
  }

  private async execute(task: taskControl): Promise<void> {
    console.log(
      `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} Executando: ${
        task.name
      }`
    )

    const response = await this.core.getPayloadTask(task.id)
    if (!response) throw new Error("No content")

    await jobs[task.name as keyof typeof jobs].handle(
      JSON.parse(response.payload)
    )
  }

  public async loadPendingTasks(): Promise<void> {
    const pending = await this.core.getPendingTasks()
    this.tasks.push(...pending)
    this.sort()
    this.process()
  }

  public getSize(): number {
    return this.tasks.length
  }
}
