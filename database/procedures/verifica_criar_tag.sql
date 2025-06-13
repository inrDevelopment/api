-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_criar_tag;

CREATE PROCEDURE verifica_criar_tag (
    recursotag VARCHAR(5)
)
BEGIN
    SELECT 
        COUNT(r.id) as 'count' 
    FROM 
        recurso r
    WHERE 
        r.tag = recursotag
    AND 
        r.exc = "N"
    AND 
        r.excluido_em IS NULL
    AND 
        r.excluido_id IS NULL;
END;