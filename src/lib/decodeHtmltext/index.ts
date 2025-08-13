import { decode } from "html-entities"

function fixText(html: string): string {
  let texto = decode(html)
  texto = texto.replace(/<[^>]+>/g, "")
  texto = decode(texto)
  texto = texto
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return texto
}

export default fixText
