-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_be_numero;

CREATE PROCEDURE get_be_numero ()
BEGIN
    SELECT 
        valor 
    FROM 
        config 
    WHERE 
        idconfig = 13;
END;