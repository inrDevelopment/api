-- Active: 1759336023082@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS vincula_usuario_desktop;

CREATE PROCEDURE vincula_usuario_desktop (
    uuidValue VARCHAR(15),
    idusuarioValue INT
) BEGIN
UPDATE canal_desktop
SET idusuario = idusuarioValue
WHERE uuid = uuidValue;
END;