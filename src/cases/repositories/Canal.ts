import { Repository } from "../core/Repository"

export default class CanalRepository extends Repository {
  async countMembers(): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>("count_mobile_members")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getPaginatedMembers(params: {
    limite: number
    pagina: number
  }): Promise<{ token: string }[]> {
    try {
      return this.many<{ token: string }>(
        "get_paginated_members",
        params.limite,
        params.pagina
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteMember(params: {
    token: string
  }): Promise<{ affectedRows: number }> {
    try {
      return await this.commom("delete_member_app", params.token)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
