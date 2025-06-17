import { Transporter, createTransport } from "nodemailer"
import { Options, SentMessageInfo } from "nodemailer/lib/smtp-transport"
import mail from "../../config/mail"

export class Mail {
  private transporter: Transporter<SentMessageInfo, Options>

  constructor() {
    this.transporter = createTransport({
      host: mail.host,
      port: mail.port,
      secure: true,
      auth: {
        user: mail.user,
        pass: mail.pass
      }
    })
  }

  async sendmail(params: {
    destinatario: string
    assunto: string
    text?: string
    html?: string
  }): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: '"INR Publicações" <sistema@publicacoesinr.com.br>',
        to: params.destinatario,
        subject: params.assunto,
        text: params.text,
        html: params.html
      })

      console.log("Mensagem enviada:", info.messageId)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
