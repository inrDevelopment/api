-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS update_data_title_be;

CREATE PROCEDURE update_data_title_be (
    IN idboletim INT,
    IN datatitle VARCHAR(200),
    IN dataBoletim VARCHAR(25),
    IN alteradoId INT
)
BEGIN
    UPDATE
        boletim
    SET
        titulo = datatitle,
        `data` = dataBoletim,
        alterado_em = NOW(),
        alterado_id = alteradoId
    WHERE
        id = idboletim;
END;