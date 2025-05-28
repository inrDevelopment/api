-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS delete_boletim;

CREATE PROCEDURE delete_boletim (
    IN idboletim INT,
    IN idusuario INT
)
BEGIN
    UPDATE 
        boletim 
    SET 
        exc = "S", 
        excluido_em = now(), 
        excluido_id = idusuario
    WHERE id = idboletim;
END;