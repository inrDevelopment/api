-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS update_boletim_observacao;

CREATE PROCEDURE update_boletim_observacao (
    idBoletim INT,
    observacao TEXT,
    alteradoId INT
)
BEGIN
    UPDATE 
        boletim 
    SET 
        observacao = observacao,
        alterado_id = alteradoId,
        alterado_em = NOW() 
    WHERE 
        id = idBoletim;
END;