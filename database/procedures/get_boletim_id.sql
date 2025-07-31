-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_boletim_id;

CREATE PROCEDURE get_boletim_id (
    boletim_id INT
)
BEGIN
    SELECT 
        b.id,
        b.titulo,
        b.numero,
        b.boletim_tipo_id,
        bt.nome as 'boletim_tipo_nome',
        b.`data`,
        b.ativo,
        b.favorito,
        b.vizualizacao,
        b.observacao,
        b.criado_id,
        b.criado_em,
        uc.nome as 'criado_nome',
        b.alterado_id,
        b.alterado_em,
        ua.nome as 'alterado_nome',
        b.aprovado_id,
        b.aprovado_em,
        uap.nome as 'aprovado_nome',
        b.aprovado,
        b.publicado_id,
        b.publicado_em,
        upb.nome as 'publicado_nome',
        b.publicado
    FROM 
        boletim b
    INNER JOIN
        boletim_tipo bt
    ON bt.id = b.boletim_tipo_id
    LEFT JOIN 
        usuario uc 
    ON uc.idusuario = b.criado_id    
    LEFT JOIN 
        usuario ua 
    ON ua.idusuario = b.alterado_id    
    LEFT JOIN
        usuario uap
    ON uap.idusuario = b.aprovado_id
    LEFT JOIN
        usuario upb
    ON upb.idusuario = b.publicado_id
    WHERE 
        b.id = boletim_id
    AND 
        b.exc = "N"
    AND
        b.excluido_em IS NULL
    AND
        b.excluido_id IS NULL;        
END;