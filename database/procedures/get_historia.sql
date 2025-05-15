-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS get_historia;

CREATE PROCEDURE get_historia (
    IN historiaid INT
)
BEGIN
    SELECT 
        idhistoria, 
        titulo
    FROM historia 
    WHERE idhistoria = historiaid
    AND exec = "N";
END;