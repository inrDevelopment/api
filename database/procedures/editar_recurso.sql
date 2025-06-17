-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS editar_recurso;

CREATE PROCEDURE editar_recurso (
    recursoId INT,
    recursoNome VARCHAR(150),
    recursoIcone VARCHAR(30),
    recursoTag VARCHAR(5),
    recursoUrl VARCHAR(200),
    recursoAtributos VARCHAR(6),
    recursoAtivo BOOL,
    recursoTipoId INT,
    alteradoId INT
)
BEGIN
    UPDATE recurso SET
        nome = recursoNome,
        tag = recursoTag,
        icone = recursoIcone,
        url = recursoUrl,
        ativo = recursoAtivo,
        atributos = recursoAtributos,
        recurso_tipo_id = recursoTipoId,
        alterado_id = alteradoId,
        alterado_em = NOW()
    WHERE id = recursoId;
END;