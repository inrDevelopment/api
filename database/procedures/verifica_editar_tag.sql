-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_editar_tag;

CREATE PROCEDURE verifica_editar_tag (
    recursoid INT,
    recursotag CHAR(5)
)
BEGIN
    SELECT 
        COUNT(r.id) as 'count' 
    FROM 
        recurso r 
    WHERE 
        r.tag = recursotag
    AND 
        r.id <> recursoid;
END;