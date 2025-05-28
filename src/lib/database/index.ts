import mysql, { RowDataPacket } from "mysql2/promise"
import configuracao from "../../config/database"

if (!global.database) {
  global.database = mysql.createPool({
    host: configuracao.host,
    user: configuracao.user,
    database: configuracao.database,
    password: configuracao.password,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  })
}

database = global.database

export default database

export async function execute<T = any>(sql: string): Promise<T | null> {
  try {
    const [QueryResult] = await database.execute<RowDataPacket[]>(sql)

    if (!QueryResult[0][0]) return null

    return QueryResult[0][0] as T
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function arrayExecute<T = any>(sql: string): Promise<T[]> {
  try {
    const [QueryResult] = await database.execute<RowDataPacket[]>(sql)

    if (!QueryResult[0]) return []

    return QueryResult[0] as T[]
  } catch (error: any) {
    throw new Error(error.message)
  }
}
