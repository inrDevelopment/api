-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_classificador_numero;

CREATE PROCEDURE get_classificador_numero ()
BEGIN
    SELECT 
        valor 
    FROM 
        config 
    WHERE 
        idconfig = 14;
END;