-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS remove_aprovacao;

CREATE PROCEDURE remove_aprovacao (
    idBoletim INT
)
BEGIN
    UPDATE 
        boletim 
    SET 
        aprovado = "N", 
        aprovado_id = NULL, 
        aprovado_em = NULL
    WHERE 
        id = idBoletim;
END;