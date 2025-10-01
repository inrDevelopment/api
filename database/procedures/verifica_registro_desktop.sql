-- Active: 1759336023082@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE verifica_registro_desktop;

CREATE PROCEDURE verifica_registro_desktop(
    uuidValue VARCHAR(15)
)
BEGIN
    SELECT 
        COUNT(id) as "count" 
    FROM 
        canal_desktop 
    WHERE 
        uuid = uuidValue;
END