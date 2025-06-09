-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS validar_item_boletim;

CREATE PROCEDURE validar_item_boletim (
    idItem INT,
    idBoletim INT,
    conteudoTipoId INT
)
BEGIN
    SELECT 
        COUNT(bc.id) as 'count'
    FROM 
        boletim_conteudo bc 
    WHERE 
        bc.identificador = idItem
    AND 
        bc.boletim_id = idBoletim 
    AND 
        conteudo_tipo_id = conteudoTipoId;
END;