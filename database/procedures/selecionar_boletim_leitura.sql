-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS selecionar_boletim_leitura;

CREATE PROCEDURE selecionar_boletim_leitura (
    idBoletim INT
)
BEGIN
    SELECT 
        b.id,
        b.titulo,
        b.numero,
        b.`data`,
        b.vizualizacao 
    FROM 
        boletim b 
    WHERE 
        b.id = idBoletim
    AND 
        b.exc = "N"
    AND 
        b.ativo = TRUE
    AND 
        b.publicado = "S"
    AND 
        b.aprovado = "S";
END;