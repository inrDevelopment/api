export default {
  host: process.env.MAIL_HOST || "",
  port: process.env.MAIL_PORT ? +process.env.MAIL_PORT : undefined,
  user: process.env.MAIL_AUTH_USER || "",
  pass: process.env.MAIL_AUTH_PASS || ""
}
