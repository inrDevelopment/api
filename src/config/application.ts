export default {
  env: process.env.ENV || "",
  key: process.env.KEY || "",
  host: { dev: process.env.HOST_DEV || "", prod: process.env.HOST_PROD || "" },
  name: process.env.NAME || "",
  port: process.env.PORT || ""
}
