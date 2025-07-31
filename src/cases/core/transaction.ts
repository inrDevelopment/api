import { PoolConnection } from "mysql2/typings/mysql/lib/PoolConnection"

export function Transaction() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const conn = await database.getConnection()

      try {
        await conn.beginTransaction()

        const result = await originalMethod.call(this, ...args, conn)

        await conn.commit()
        return result
      } catch (err) {
        await conn.rollback()
        throw err
      } finally {
        conn.release()
      }
    }

    return descriptor
  }
}

export type transactional<In = any, Out = any> = {
  (params: In, conn: PoolConnection): Promise<Out>
}
