-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS selecionar_recurso;

CREATE PROCEDURE selecionar_recurso (
    recursoid INT
)
BEGIN
    SELECT 
        r.id,
        r.nome,
        r.icone,
        r.url,
        r.tag,
        r.recurso_tipo_id,
        rt.nome as 'recurso_tipo_nome',
        r.ativo,
        r.atributos,
        r.criado_id as 'criadoid',
        us.nome as 'criadonome',
        r.criado_em as 'criadoem',
        r.alterado_id as 'editadoid',
        usi.nome as 'editadonome',
        r.excluido_em as 'editadoem'
    FROM 
        recurso r
    INNER JOIN 
        recurso_tipo rt 
    ON 
        rt.id = r.recurso_tipo_id
    INNER JOIN 
        usuario us 
    ON 
        us.idusuario = r.criado_id
    INNER JOIN
        usuario usi 
    ON 
        usi.idusuario = r.alterado_id
    WHERE 
        r.id = recursoid
    AND 
        r.exc = 'N';
END;