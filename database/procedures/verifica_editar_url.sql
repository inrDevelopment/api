-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_editar_url;

CREATE PROCEDURE verifica_editar_url (
    recursoid INT,
    recursourl CHAR(5)
)
BEGIN
    SELECT 
        COUNT(r.id) as 'count' 
    FROM 
        recurso r 
    WHERE 
        r.url = recursourl
    AND 
        r.id <> recursoid;
END;