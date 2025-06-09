-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS selecionar_boletim_item_leitura;

CREATE PROCEDURE selecionar_boletim_item_leitura (
    idBoletim INT
)
BEGIN
    SELECT 
        bc.id,
        bc.conteudo_tipo_id,
        bct.nome as 'tipo',
        bc.titulo,
        bc.url,
        bc.conteudo
    FROM 
        boletim_conteudo bc
	INNER JOIN 
        boletim_conteudo_tipo bct 
    ON 
        bct.id = bc.conteudo_tipo_id        
    WHERE 
        bc.boletim_id = idBoletim
    ORDER BY 
        bc.conteudo_tipo_id ASC,
        bc.ordem ASC; 
END;