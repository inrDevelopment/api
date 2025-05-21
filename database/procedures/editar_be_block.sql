-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS editar_be_block;

CREATE PROCEDURE editar_be_block (
    IN val CHAR(1),
    OUT updated INT
)
BEGIN
    UPDATE config SET
     valor = val
    WHERE idconfig = 17;

    SET updated = ROW_COUNT();
END;