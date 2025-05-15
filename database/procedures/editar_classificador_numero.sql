-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS editar_classificador_numero;

CREATE PROCEDURE editar_classificador_numero (
    IN novoNumero INT,
    OUT updated INT
)
BEGIN
    UPDATE config SET
     valor = novoNumero
    WHERE idconfig = 14;

    SET updated = ROW_COUNT();
END;