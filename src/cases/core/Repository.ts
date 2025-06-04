import type { RowDataPacket } from "mysql2"
import database from "../../lib/database"

export class Repository {
  protected async procedure<T>(
    name: string,
    ...values: any[]
  ): Promise<T | null> {
    try {
      const [QueryResult] = await database.execute<RowDataPacket[]>(
        `CALL ${name}(${values})`
      )

      try {
        if (!QueryResult[0][0]) return null
      } catch (error) {
        throw new Error(
          "Procedure sem retorno. Use silentprocedure em vez de procedure"
        )
      }

      return QueryResult[0][0] as T
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  protected async many<T>(name: string, ...values: any[]): Promise<T[]> {
    try {
      console.log(`CALL ${name}(${values})`)

      const [QueryResult] = await database.execute<RowDataPacket[]>(
        `CALL ${name}(${values})`
      )

      if (!QueryResult[0]) return []

      return QueryResult[0] as T[]
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  protected async silentprocedure(
    name: string,
    ...values: any[]
  ): Promise<void> {
    try {
      const [QueryResult] = await database.execute<any>(
        `CALL ${name}(${values})`
      )

      if (!QueryResult) throw new Error("Erro ao verificar alterações.")

      if (QueryResult.affectedRows <= 0)
        throw new Error("Nenhuma alteração foi realizada.")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  protected async updateprocedure(
    name: string,
    ...values: any[]
  ): Promise<{ affectedRows: number }> {
    try {
      const [QueryResult] = await database.execute<any>(
        `CALL ${name}(${values})`
      )

      if (!QueryResult) throw new Error("Erro ao verificar alterações.")

      return QueryResult
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  protected async deleteprocedure(
    name: string,
    ...values: any[]
  ): Promise<{ affectedRows: number }> {
    try {
      const [QueryResult] = await database.execute<any>(
        `CALL ${name}(${values})`
      )

      if (!QueryResult)
        throw new Error(
          "Não foi possivel verificar se a exclusão foi realizada."
        )

      return QueryResult.affectedRows
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  protected formatDate(isoDate: Date): string {
    return `'${isoDate.toISOString().slice(0, 19).replace("T", " ")}'`
  }

  protected zeroDate(value: string): string {
    if (value === "NULL") return "NULL"

    const date = new Date(value)

    if (isNaN(date.getTime())) {
      throw new Error("Data inválida")
    }

    const dataZerada = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    )

    return `'${dataZerada.toISOString().slice(0, 19).replace("T", " ")}'`
  }

  protected finalDate(value: string): string {
    if (value === "NULL") return "NULL"

    const date = new Date(value)

    if (isNaN(date.getTime())) {
      throw new Error("Data inválida")
    }

    const dataAjustada = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        23,
        59,
        59,
        999
      )
    )

    return `'${dataAjustada.toISOString().slice(0, 19).replace("T", " ")}'`
  }
}
