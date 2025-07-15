-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS count_lista_tipo_recurso;

CREATE PROCEDURE count_lista_tipo_recurso ()
BEGIN
    SELECT
        COUNT(id) as "count"
    FROM 
        recurso_tipo;
END;