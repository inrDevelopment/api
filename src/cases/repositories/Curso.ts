import { Repository } from "../core/Repository"

export default class CursoRepository extends Repository {
  getCursoById(params: {
    cursoid: number
  }): Promise<{ idcurso: number; titulo: string; texto: string } | null> {
    try {
      return this.call<{ idcurso: number; titulo: string; texto: string }>(
        "get_curso_by_id",
        params.cursoid
      )
    } catch (error: any) {
      throw new Error(`curso -:${error.message}`)
    }
  }

  listaCurso(params: {
    limite: number
    pagina: number
  }): Promise<{ id: number; titulo: string; datacad: string }[]> {
    try {
      return this.many<{ id: number; titulo: string; datacad: string }>(
        "lista_curso",
        params.limite,
        params.pagina * params.limite
      )
    } catch (error: any) {
      throw new Error(`curso -:${error.message}`)
    }
  }
}
