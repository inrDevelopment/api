-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS count_lista_historia;

CREATE PROCEDURE count_lista_historia ()
BEGIN
    SELECT 
        COUNT(h.idhistoria) as 'count'
    FROM 
        historia h
    WHERE 
        exec = "N";
END;