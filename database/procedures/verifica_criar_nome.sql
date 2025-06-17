-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_criar_nome;

CREATE PROCEDURE verifica_criar_nome (
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
        r.exc = "N"
    AND 
        r.excluido_em IS NULL
    AND 
        r.excluido_id IS NULL;
END;