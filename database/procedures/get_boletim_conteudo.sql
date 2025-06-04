-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_boletim_conteudo;

CREATE PROCEDURE get_boletim_conteudo (
    IN idboletim INT
)
BEGIN
    SELECT
        bc.id,
        bc.conteudo_tipo_id,
        bct.nome as "conteudo_tipo",
        bc.titulo,
        bc.url,
        bc.conteudo,
        bc.ordem
    FROM
        boletim_conteudo bc
    INNER JOIN 
        boletim_conteudo_tipo bct 
    ON 
        bct.id = bc.conteudo_tipo_id
    WHERE 
        bc.boletim_id = 1
    ORDER BY 
        bc.conteudo_tipo_id ASC, 
        bc.ordem ASC;
END;