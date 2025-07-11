-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS atualiza_canal_app;

CREATE PROCEDURE atualiza_canal_app (
    uuidValue VARCHAR(15),
    userToken TEXT    
)
BEGIN
    UPDATE canal_app SET
        token = userToken
    WHERE 
        uuid = uuidValue;
END;