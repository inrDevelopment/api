-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_criar_url;

CREATE PROCEDURE verifica_criar_url (
    recursourl VARCHAR(200)
)
BEGIN
    SELECT 
        COUNT(r.id) as 'count' 
    FROM 
        recurso r
    WHERE 
        r.url = recursourl
    AND 
        r.exc = "N"
    AND 
        r.excluido_em IS NULL
    AND 
        r.excluido_id IS NULL;
END;