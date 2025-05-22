import swaggerJSDoc from "swagger-jsdoc"
import favoriteThis from "./favoriteThis"
import listarBoletins from "./listarBoletins"
import listarFavoritos from "./listarFavorito"
import markAsReaded from "./markAsReaded"
import markAsUnreaded from "./markAsUnreaded"
import novoBoletim from "./novoBoletim"
import unfavoriteThis from "./unfavoriteThis"

const paths: Record<string, swaggerJSDoc.PathItem> = {
  /* /boletim */
  "/boletim/novo": novoBoletim,
  /* /leitor */
  "/leitor/listar": listarBoletins,
  "/leitor/leitura/{id}/adicionar": markAsReaded,
  "/leitor/leitura/{id}/remover": markAsUnreaded,
  "/leitor/favorito": listarFavoritos,
  "/leitor/favorito/{id}/adicionar": favoriteThis,
  "/leitor/favorito/{id}/remover": unfavoriteThis
}

export default paths
