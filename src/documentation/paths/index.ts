import swaggerJSDoc from "swagger-jsdoc"
import addFavorito from "./addFavorito"
import lerBoletim from "./lerBoletim"
import listarBoletinsPrivado from "./listarBoletinsPrivado"
import listarBoletinsPublico from "./listarBoletinsPublico"
import listarFavoritos from "./listarFavoritos"
import loginLeitor from "./loginLeitor"
import markAsReaded from "./markAsReaded"
import markAsUnReaded from "./markAsUnReaded"
import registrarLeitor from "./registrarLeitor"
import removeFavoritos from "./removeFavoritos"
import ultimoBoletim from "./ultimoBoletim"

const paths: Record<string, swaggerJSDoc.PathItem> = {
  /* /boletim */
  /* ---------------------------------------------- */
  /* /leitor */
  "/leitor/autenticacao": loginLeitor,
  "/leitor/boletims/privado": listarBoletinsPrivado,
  "/leitor/boletims/publico": listarBoletinsPublico,
  "/leitor/registrar": registrarLeitor,
  "/leitor/leitura/{id}/adicionar": markAsReaded,
  "/leitor/leitura/{id}/remover": markAsUnReaded,
  "/leitor/favorito/{id}/adicionar": addFavorito,
  "/leitor/favorito/{id}/remover": removeFavoritos,
  "/leitor/favorito": listarFavoritos,
  "/leitor/ultimo-boletim": ultimoBoletim,
  "/leitor/ler": lerBoletim
  /* ---------------------------------------------- */
}

export default paths
