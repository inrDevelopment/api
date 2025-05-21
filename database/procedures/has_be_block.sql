-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS has_be_block;

CREATE PROCEDURE has_be_block ()
BEGIN
    SELECT 
        valor 
    FROM 
        config 
    WHERE 
        idconfig = 17;
END;