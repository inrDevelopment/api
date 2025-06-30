import swaggerJSDoc from "swagger-jsdoc"

const TAG = "Leitor"

const bePrivado: swaggerJSDoc.PathItem = { post: { tags: [TAG] } }
const bePublico: swaggerJSDoc.PathItem = { post: { tags: [TAG] } }
const addLeitura: swaggerJSDoc.PathItem = { get: { tags: [TAG] } }
const delRemove: swaggerJSDoc.PathItem = { delete: { tags: [TAG] } }
const favAdicionar: swaggerJSDoc.PathItem = { get: { tags: [TAG] } }
const favRemover: swaggerJSDoc.PathItem = { delete: { tags: [TAG] } }
const ultimoBoletim: swaggerJSDoc.PathItem = { get: { tags: [TAG] } }
const listaBoletim: swaggerJSDoc.PathItem = { post: { tags: [TAG] } }
const registrarAplicacao: swaggerJSDoc.PathItem = { post: { tags: [TAG] } }
const lerPrivado: swaggerJSDoc.PathItem = { get: { tags: [TAG] } }
const lerPublico: swaggerJSDoc.PathItem = { get: { tags: [TAG] } }

export default {
  addLeitura,
  bePrivado,
  bePublico,
  delRemove,
  favAdicionar,
  favRemover,
  lerPrivado,
  lerPublico,
  listaBoletim,
  registrarAplicacao,
  ultimoBoletim
}
