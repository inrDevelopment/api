-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS editar_recurso;

CREATE PROCEDURE editar_recurso (
    recursoId INT,
    recursoNome VARCHAR(150),
    recursoIcone VARCHAR(30),
    recursoTag VARCHAR(5),
    recursoUrl VARCHAR(200),
    recursoTipoId INT,
    recursoAtivo BOOL,
    alteradoId INT
)
BEGIN
    UPDATE recurso SET
        nome = recursoNome,
        icone = recursoIcone,
        tag = recursoTag,
        url = recursoUrl,
        recurso_tipo_id = recursoTipoId,
        ativo = recursoAtivo,
        alterado_id = alteradoId,
        alterado_em = NOW()
    WHERE id = recursoId;
END;