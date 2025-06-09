-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS editar_item_boletim;

CREATE PROCEDURE editar_item_boletim (
    idItem INT,
    tipo_id INT,
    boletim_id INT,
    ident INT,
    titulo_item TEXT,
    conteudo_item TEXT,
    url_item TEXT,
    ordem_item INT
)
BEGIN
    UPDATE 
        boletim_conteudo 
    SET 
        conteudo_tipo_id = tipo_id, 
        boletim_id = boletim_id, 
        identificador = ident,
        titulo = titulo_item,
        conteudo = conteudo_item,
        url = url_item,
        ordem = ordem_item
    WHERE 
        id = idItem;
END;