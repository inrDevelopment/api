-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS registra_canal_app;

CREATE PROCEDURE registra_canal_app (
    uuidValue VARCHAR(15),
    userToken TEXT
)
BEGIN
    INSERT INTO
        canal_app (
            uuid,
            token
        ) VALUES (
            uuidValue,
            userToken
        );
END;