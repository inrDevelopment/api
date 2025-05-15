-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS editar_ieptb_numero;

CREATE PROCEDURE editar_ieptb_numero (
    IN novoNumero INT,
    OUT updated INT
)
BEGIN
    UPDATE config SET
     valor = novoNumero
    WHERE idconfig = 15;

    SET updated = ROW_COUNT();
END;