-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_registro;

CREATE PROCEDURE verifica_registro (
    uuidValue VARCHAR(15)
)
BEGIN
    SELECT 
        COUNT(id) as "count" 
    FROM 
        canal_app 
    WHERE 
        uuid = uuidValue;
END;