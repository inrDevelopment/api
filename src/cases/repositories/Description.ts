import { Repository } from "../core/Repository"

export default class DescriptionRepository extends Repository {
  async get(params: { id: number }): Promise<{ conteudo: string } | null> {
    try {
      return await this.call<{ conteudo: string }>(
        "get_content_by_id",
        `'${params.id}'`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
