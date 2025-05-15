-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_ieptb_numero;

CREATE PROCEDURE get_ieptb_numero ()
BEGIN
    SELECT 
        valor 
    FROM 
        config 
    WHERE 
        idconfig = 15;
END;