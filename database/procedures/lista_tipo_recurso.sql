-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS lista_tipo_recurso;

CREATE PROCEDURE lista_tipo_recurso (
    limite INT,
    pagina INT
)
BEGIN
    SELECT
        id,
        nome,
        tag
    FROM 
        recurso_tipo
    ORDER BY 
        nome, 
        tag, 
        id
    LIMIT 
        limite
    OFFSET 
        pagina;
END;