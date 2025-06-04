-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS update_data_be;

CREATE PROCEDURE update_data_be (
    IN idboletim INT,
    IN dataBoletim VARCHAR(25),
    IN alteradoId INT
)
BEGIN
    UPDATE
        boletim
    SET
        `data` = dataBoletim,
        alterado_em = NOW(),
        alterado_id = alteradoId,
        aprovado = "N",
        aprovado_em = NULL,
        aprovado_id = NULL
    WHERE
        id = idboletim;
END;