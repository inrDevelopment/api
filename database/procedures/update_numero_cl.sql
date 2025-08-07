-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS update_numero_cl;

CREATE PROCEDURE update_numero_cl (
    IN novo INT
)
BEGIN
    UPDATE
        config
    SET 
        valor = novo
    WHERE 
        idconfig = 14;
END;