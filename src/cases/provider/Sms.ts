import Provider from "../core/Provider"

export default class SMS extends Provider {
  async recoveryPasswordCode(params: {
    code: string
    phone: string
  }): Promise<boolean> {
    try {
      const envio = await this.sms(
        params.phone,
        `Código de recuperação de usuário: ${params.code}`
      )

      if (!envio.success) throw new Error(envio.msg)

      return true
    } catch (error: any) {
      return false
    }
  }
}
