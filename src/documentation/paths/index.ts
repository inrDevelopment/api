import swaggerJSDoc from "swagger-jsdoc"
import boletim from "./boletim"
import classifiers from "./classifiers"
import leitor from "./leitor"
import seguranca from "./seguranca"

const paths: Record<string, swaggerJSDoc.PathItem> = {
  "/boletim/novo": boletim.novo,
  "/boletim/item": boletim.item,
  "/boletim/{id}/update": boletim.update,
  "/boletim/item/{id}/update": boletim.itemUpdate,
  "/boletim/item/{id}/delete": boletim.itemDelete,
  /**---------------------------------------------- */
  "/classificadores/state": classifiers.state,
  "/classificadores": classifiers.list,
  "/classificadores/{id}": classifiers.select,
  "/classificadores/act-content": classifiers.actContent,
  "/classificadores/previous-acts": classifiers.previousActs,
  "/classificadores/previous-bars": classifiers.previousBars,
  /**---------------------------------------------- */
  "/leitor/leitura/{id}/adicionar": leitor.addLeitura,
  "/leitor/favorito/{id}/adicionar": leitor.favAdicionar,
  "/leitor/ultimo-boletim": leitor.ultimoBoletim,
  "/leitor/ler/privado": leitor.lerPrivado,
  "/leitor/ler/publico": leitor.lerPublico,
  "/leitor/boletims/privado": leitor.bePrivado,
  "/leitor/boletims/publico": leitor.bePublico,
  "/leitor/favorito": leitor.listaBoletim,
  "/leitor/registrar": leitor.registrarAplicacao,
  "/leitor/favorito/{id}/remover": leitor.favRemover,
  "/leitor/leitura/{id}/remover": leitor.delRemove,
  /**---------------------------------------------- */
  "/autenticacao/site": seguranca.authSite,
  "/autenticacao/painel": seguranca.authPainel,
  "/autenticacao/app": seguranca.authApp
  /**---------------------------------------------- */
}

export default paths
