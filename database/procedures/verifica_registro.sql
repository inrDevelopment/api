-- Active: 1759336023082@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE verifica_registro;

CREATE PROCEDURE verifica_registro(
    uuidValue VARCHAR(15)
)
BEGIN
    SELECT 
        COUNT(id) as "count" 
    FROM 
        canal_app 
    WHERE 
        uuid = uuidValue;
END