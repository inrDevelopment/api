import swaggerJSDoc from "swagger-jsdoc"
import listarBoletins from "./listarBoletins"
import novoBoletim from "./novoBoletim"

const paths: Record<string, swaggerJSDoc.PathItem> = {
  "/boletim/novo": novoBoletim,
  "/boletim/listar": listarBoletins
}

export default paths
