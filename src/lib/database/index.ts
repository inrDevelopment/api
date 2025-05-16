import mysql from "mysql2/promise"
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
