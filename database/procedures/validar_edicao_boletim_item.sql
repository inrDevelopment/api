-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS validar_edicao_boletim_item;

CREATE PROCEDURE validar_edicao_boletim_item (    
    idItem INT,
    conteudoTipoId INT,
    boletimId INT,
    identificador INT
)
BEGIN
    SELECT 
        COUNT(bc.id) as 'count'
    FROM 
        boletim_conteudo bc
    WHERE 
        bc.identificador = identificador
    AND 
        bc.boletim_id = boletimId 
    AND 
        conteudo_tipo_id = conteudoTipoId
    AND 
        id <> idItem;
END;