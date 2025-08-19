import Queue from "../../lib/Queue"
import CanalRepository from "../repositories/Canal"

export default class PublishMobile {
  private total: number = 0
  private pagina: number = 0
  private count: number = 0
  private limite: number = 50

  constructor(private repository: CanalRepository) {}

  private async populateTotalMembers(): Promise<void> {
    try {
      const totalMembers = await this.repository.countMembers()

      if (!totalMembers)
        throw new Error("Erro ao buscar os membros para publicação")

      this.total = totalMembers.count
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async process() {
    try {
      await this.populateTotalMembers()

      while (this.count < this.total) {
        const members = await this.repository.getPaginatedMembers({
          limite: this.limite,
          pagina: this.pagina
        })

        for (let i = 0; i < members.length; i++) {
          Queue.add("notificacaoNovoItemMobile", {
            token: members[i].token,
            title: "Novo contéudo disponível.",
            body: "",
            data: "",
            repository: this.repository
          })

          this.count += 1
        }

        this.pagina += 1
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
