import swaggerJSDoc from "swagger-jsdoc"
import listarBoletins from "./listarBoletins"
import loginLeitor from "./loginLeitor"
import markAsReaded from "./markAsReaded"
import markAsUnReaded from "./markAsUnReaded"
import registrarLeitor from "./registrarLeitor"

const paths: Record<string, swaggerJSDoc.PathItem> = {
  /* /boletim */
  /* ---------------------------------------------- */
  /* /leitor */
  "/leitor/autenticacao": loginLeitor,
  "/leitor/listar": listarBoletins,
  "/leitor/registrar": registrarLeitor,
  "/leitor/{id}/adicionar": markAsReaded,
  "/leitor/{id}/remover": markAsUnReaded
  /* ---------------------------------------------- */
}

export default paths
