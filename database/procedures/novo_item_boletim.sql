-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS novo_item_boletim;

CREATE PROCEDURE novo_item_boletim (
    boletim_id INT,
    tipo_id INT,
    ident INT,
    titulo_item TEXT,
    conteudo_item TEXT,
    url_item TEXT,
    ordem_item INT
)
BEGIN
    INSERT INTO 
        boletim_conteudo (
            conteudo_tipo_id,
            boletim_id,
            identificador,
            titulo,
            conteudo,
            url,
            click,
            ordem
        ) VALUES (
            tipo_id,
            boletim_id,
            ident,
            titulo_item,
            conteudo_item,
            url_item,
            0,
            ordem_item
        );

    SELECT LAST_INSERT_ID() AS 'id';
END;