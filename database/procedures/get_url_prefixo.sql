-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_url_prefixo;

CREATE PROCEDURE get_url_prefixo ()
BEGIN
    SELECT 
        valor 
    FROM 
        config 
    WHERE 
        idconfig = 16;
END;