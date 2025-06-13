-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_usuario_recursos;

CREATE PROCEDURE get_usuario_recursos (
    idusuario INT
)
BEGIN
    SELECT 
        rt.label as 'tipo',
        r.nome,
        r.icone,
        r.tag,
        r.url,
        r.atributos
    FROM 
        usuario_recurso ur
    INNER JOIN 
        recurso r 
    ON 
        r.id = ur.idrecurso
    INNER JOIN
        recurso_tipo rt
    ON
        rt.id = r.recurso_tipo_id
    WHERE 
        ur.idusuario = idusuario
    AND
        r.exc = "N" 
    AND 
        r.excluido_em IS NULL
    AND 
        r.excluido_id IS NULL
    ORDER BY 
        rt.label, 
        r.nome;
END;