-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS can_update_be;

CREATE PROCEDURE can_update_be (idboletim INT)
BEGIN
    SELECT
        b.id,
        b.boletim_tipo_id
    FROM
        boletim b
    WHERE
        b.id = idboletim
        AND b.publicado = "N"
        AND b.excluido_id IS NULL
        AND b.excluido_em IS NULL
        AND b.exc = 'N';
END;