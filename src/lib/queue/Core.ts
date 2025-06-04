import { arrayExecute, execute } from "../database"
import { taskControl, TaskStatus } from "./typing"

export default class {
  async saveTask(params: {
    name: string
    priority: number
    retries: number
    maxRetries: number
    rateLimit: number
    payload: any
  }): Promise<taskControl> {
    try {
      const now = new Date()

      const response = await execute<{ idtask: number }>(
        `INSERT 
          INTO tasks (
            name, 
            priority, 
            retries, 
            maxRetries, 
            status, 
            rateLimit, 
            createdAt,
            payload
          ) VALUES (
           '${params.name}',
           ${params.priority},
           ${params.retries},
           ${params.maxRetries},
           ${TaskStatus.PENDING},
           ${params.rateLimit},
           ${now},
           ${params.payload}
          );

        SELECT LAST_INSERT_ID() as "idtask";`
      )

      if (!response) throw new Error("Tarefa não registrada")

      return {
        id: response.idtask,
        name: params.name,
        priority: params.priority,
        retries: params.retries,
        maxRetries: params.maxRetries,
        rateLimit: params.rateLimit,
        status: TaskStatus.PENDING,
        createdAt: now
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async markAsProcessing(taskId: number): Promise<void> {
    try {
      await execute<any>(`UPDATE tasks set status = 1 WHERE id = ${taskId};`)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async incrementRetries(taskId: number): Promise<void> {
    try {
      await execute<any>(
        `UPDATE tasks SET retries = retries + 1 where id = ${taskId};`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async markAsDone(taskId: number): Promise<void> {
    try {
      await execute<any>(`DELETE FROM tasks WHERE id = ${taskId};`)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async markAsFailed(taskId: number): Promise<void> {
    try {
      await execute<any>(`UPDATE tasks set status = 3 WHERE id = ${taskId};`)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getPayloadTask(taskId: number): Promise<{ payload: string } | null> {
    try {
      return await execute<{ payload: string }>(
        `SELECT payload from tasks where id = ${taskId};`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getPendingTasks(): Promise<
    {
      id: number
      name: string
      priority: number
      retries: number
      maxRetries: number
      status: number
      rateLimit: number
      createdAt: Date
    }[]
  > {
    try {
      return await arrayExecute<{
        id: number
        name: string
        priority: number
        retries: number
        maxRetries: number
        status: number
        rateLimit: number
        createdAt: Date
      }>(
        `SELECT
            t.id,
            t.name,
            t.priority,
            t.retries,
            t.maxRetries,
            t.status,
            t.rateLimit,
            t.createdAt
          FROM
            tasks t
          WHERE
            t.status = 0
          ORDER BY
            t.priority ASC;`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
