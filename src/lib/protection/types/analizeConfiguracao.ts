export type analizeConfiguracao = {
  acao?: "ler" | "criar" | "editar" | "excluir" | "aprovar" | "publicar"
  recurso?: string
  nivel: 0 | 1 | 2
}
