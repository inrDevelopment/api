import swaggerJSDoc from "swagger-jsdoc"
import addFavorito from "./addFavorito"
import lerBoletimPrivado from "./lerBoletimPrivado"
import lerBoletimPublico from "./lerBoletimPublico"
import listarBoletinsPrivado from "./listarBoletinsPrivado"
import listarBoletinsPublico from "./listarBoletinsPublico"
import listarFavoritos from "./listarFavoritos"
import { default as loginApp } from "./loginApp"
import loginPanel from "./loginPanel"
import loginSite from "./loginSite"
import markAsReaded from "./markAsReaded"
import markAsUnReaded from "./markAsUnReaded"
import registrarLeitor from "./registrarLeitor"
import removeFavoritos from "./removeFavoritos"
import ultimoBoletim from "./ultimoBoletim"

const paths: Record<string, swaggerJSDoc.PathItem> = {
  //#region /seguranca
  /* - POST */
  "/seguranca/autenticacao/app": loginApp,
  "/seguranca/autenticacao/site": loginSite,
  "/seguranca/autenticacao/painel": loginPanel,
  /* - GET */
  /* - PUT */
  /* - DELETE */
  /* ---------------------------------------------- */
  //#endregion /seguranca

  //#region /boletim
  /* - POST */
  /* - GET */
  /* - PUT */
  /* - DELETE */
  /* ---------------------------------------------- */
  //#endregion /seguranca

  //#region /leitor
  /* - POST */
  "/leitor/boletims/privado": listarBoletinsPrivado,
  "/leitor/boletims/publico": listarBoletinsPublico,
  "/leitor/registrar": registrarLeitor,
  "/leitor/favorito": listarFavoritos,
  /* - GET */
  "/leitor/leitura/{id}/adicionar": markAsReaded,
  "/leitor/favorito/{id}/adicionar": addFavorito,
  "/leitor/ultimo-boletim": ultimoBoletim,
  "/leitor/ler/privado": lerBoletimPrivado,
  "/leitor/ler/publico": lerBoletimPublico,
  /* - DELETE */
  "/leitor/leitura/{id}/remover": markAsUnReaded,
  "/leitor/favorito/{id}/remover": removeFavoritos
  /* ---------------------------------------------- */
  //#endregion /leitor
}

export default paths
