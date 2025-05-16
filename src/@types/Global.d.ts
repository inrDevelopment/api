import mysql from "mysql2/promise"

declare global {
  var database: mysql.Pool
}
