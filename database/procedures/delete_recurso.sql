-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS delete_recurso;

CREATE PROCEDURE delete_recurso (
    idrecurso INT,
    excluidopor INT
)
BEGIN
    UPDATE 
        recurso 
    SET
        excluido_id = excluidopor,
        excluido_em = NOW(),
        exc = 'S'
    WHERE
        id = idrecurso;
END;