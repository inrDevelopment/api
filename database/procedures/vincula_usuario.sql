-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS vincula_usuairo;

CREATE PROCEDURE vincula_usuairo (
    uuidValue VARCHAR(15),
    idusuarioValue INT    
)
BEGIN
    UPDATE 
        canal_app
    SET
        idusuario = idusuarioValue
    WHERE
        uuid = uuidValue;
END;