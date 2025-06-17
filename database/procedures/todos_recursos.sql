-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS todos_recursos;

CREATE PROCEDURE todos_recursos ()
BEGIN
    SELECT 
        rt.label as 'tipo',
        r.nome,
        r.icone,
        r.tag,
        r.url,
        r.atributos
    FROM 
        recurso r
    INNER JOIN 
        recurso_tipo rt 
    ON 
        rt.id = r.recurso_tipo_id
    WHERE 
        r.exc = "N" 
    AND 
        r.excluido_em IS NULL
    AND 
        r.excluido_id IS NULL
    ORDER BY 
        rt.label,
        r.nome;
END;