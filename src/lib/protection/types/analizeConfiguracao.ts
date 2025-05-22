export type analizeConfiguracao = {
  acao?: "criar" | "ler" | "editar" | "excluir" | "aprovar" | "publicar"
  recurso?: string
  nivel: 0 | 1 | 2
}
