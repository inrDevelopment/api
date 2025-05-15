import { Repository } from "../types"

export default class CursoRepository extends Repository {
  getCursoById(params: {
    cursoid: number
  }): Promise<{ idcurso: number; titulo: string; texto: string } | null> {
    try {
      return this.procedure<{ idcurso: number; titulo: string; texto: string }>(
        "get_curso_by_id",
        params.cursoid
      )
    } catch (error: any) {
      throw new Error(`curso -:${error.message}`)
    }
  }
}
