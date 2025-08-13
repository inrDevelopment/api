-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS update_numero_be;

CREATE PROCEDURE update_numero_be (
    IN novo INT
)
BEGIN
    UPDATE
        config
    SET 
        valor = novo
    WHERE 
        idconfig = 13;
END;