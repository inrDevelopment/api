-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS atualiza_leitura;

CREATE PROCEDURE atualiza_leitura (
    idBoletim INT,
    quantidate INT
)
BEGIN
    UPDATE 
        boletim 
    SET 
        vizualizacao = quantidate 
    WHERE 
        id = idBoletim;
END;