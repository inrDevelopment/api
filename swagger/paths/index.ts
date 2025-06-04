import swaggerJSDoc from "swagger-jsdoc"
import listarBoletinsPrivado from "./listarBoletinsPrivado"
import listarBoletinsPublico from "./listarBoletinsPublico"
import loginLeitor from "./loginLeitor"
import markAsReaded from "./markAsReaded"
import markAsUnReaded from "./markAsUnReaded"
import registrarLeitor from "./registrarLeitor"

const paths: Record<string, swaggerJSDoc.PathItem> = {
  /* /boletim */
  /* ---------------------------------------------- */
  /* /leitor */
  "/leitor/autenticacao": loginLeitor,
  "/leitor/boletims/privado": listarBoletinsPrivado,
  "/leitor/boletims/publico": listarBoletinsPublico,
  "/leitor/registrar": registrarLeitor,
  "/leitor/{id}/adicionar": markAsReaded,
  "/leitor/{id}/remover": markAsUnReaded
  /* ---------------------------------------------- */
}

export default paths
