-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS select_boletim;

CREATE PROCEDURE select_boletim (
    IN idboletim INT
)
BEGIN
    SELECT 
        b.id,
        b.titulo,
        b.numero,
        b.`data`,
        b.ativo,
        b.favorito,
        b.vizualizacao,
        b.criado_em,
        b.criado_id,
        uc.nome as "nome_criado",
        b.alterado_em,
        b.alterado_id,
        ua.nome as "nome_alterado",
        b.aprovado,
        b.aprovado_em,
        b.aprovado_id,
        uap.nome as "nome_aprovado",
        b.publicado,
        b.publicado_em,
        b.publicado_id,
        upu.nome as "nome_publicado"
    FROM boletim b
    LEFT JOIN usuario ua
        ON ua.idusuario = b.alterado_id
    LEFT JOIN usuario uc
        ON uc.idusuario = b.criado_id
    LEFT JOIN usuario uap 
        ON uap.idusuario =  b.aprovado_id
    LEFT JOIN usuario upu
        ON upu.idusuario = b.publicado_id
    WHERE 
        b.id = idboletim
    AND 
        b.exc = "N"
    AND 
        b.excluido_em IS NULL
    AND 
        b.excluido_id IS NULL;
END;