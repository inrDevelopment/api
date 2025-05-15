-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS editar_boletim_numero;

CREATE PROCEDURE editar_boletim_numero (
    IN novoNumero INT,
    OUT updated INT
)
BEGIN
    UPDATE config SET
     valor = novoNumero
    WHERE idconfig = 13;

    SET updated = ROW_COUNT();
END;