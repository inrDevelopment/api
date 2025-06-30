import mysql from "mysql2/promise"
import { usuario } from "../lib/protection"

declare global {
  var database: mysql.Pool
  namespace Express {
    export interface Request {
      meta: meta
      usuario: usuario
    }
  }
}
