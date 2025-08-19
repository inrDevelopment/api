import { Queue, Worker } from "bullmq"
import connection from "../../config/redis"
import * as jobs from "../../jobs"

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    connection: {
      host: connection.host,
      port: +connection.port,
      username: connection.username,
      password: connection.password
    }
  }),
  name: job.key,
  handle: job.handle,
  options: job.options
}))

export default {
  queues,
  add<T = any>(name: string, data: T) {
    const q = this.queues.find(queue => queue.name === name)
    if (q) q.bull.add(q.name, data, q.options)
  },
  process() {
    return this.queues.forEach(queue => {
      const worker = new Worker(
        queue.name,
        async (job: any) => {
          queue.handle(job.data)
        },
        {
          connection: {
            host: connection.host,
            port: +connection.port,
            username: connection.username,
            password: connection.password
          }
        }
      )

      worker.on("completed", job => {
        console.log(`${job.id} has completed!`)
      })

      worker.on("failed", (job, err) => {
        console.log(`${job?.id} has failed with ${err.message}`)
      })

      worker.on("progress", (job, progress) => {
        console.log(
          `${job} reported progress ${progress} at ${new Date().toLocaleDateString()}`
        )
      })

      worker.on("active", (job, prev) => {
        console.log(
          `Job "${job.name}" está ativo; status anterior era: "${prev}"`
        )
      })
    })
  }
}
