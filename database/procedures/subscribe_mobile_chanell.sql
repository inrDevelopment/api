-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS subscribe_mobile_chanell;

CREATE PROCEDURE subscribe_mobile_chanell (
    uuidValue VARCHAR(15),
    userToken TEXT
)
BEGIN
    INSERT INTO
        canal_membro (
            uuid,
            idcanal,
            token
        ) VALUES (
            uuidValue,
            1,
            userToken
        );
END;