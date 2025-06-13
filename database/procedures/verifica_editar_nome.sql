-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_editar_nome;

CREATE PROCEDURE verifica_editar_nome (
    recursoid INT,
    recursonome VARCHAR(150)
)
BEGIN
    SELECT 
        COUNT(r.id) as 'count' 
    FROM 
        recurso r 
    WHERE 
        r.nome = recursonome 
    AND 
        r.id <> recursoid;
END;