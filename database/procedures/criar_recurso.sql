-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS criar_recurso;

CREATE PROCEDURE criar_recurso (
    IN recursoNome VARCHAR(150),
    IN recursoIcone VARCHAR(30),
    IN recursoTag VARCHAR(50),
    IN recursoUrl VARCHAR(200),
    IN recursoAtivo BOOL,
    IN recursoTipoId INT,
    IN criadoId INT
)
BEGIN
    INSERT INTO recurso 
        (
            nome, 
            icone, 
            tag, 
            url, 
            ativo, 
            recurso_tipo_id, 
            criado_id,
            criado_em,
            exc
        ) VALUES (
            recursoNome, 
            recursoIcone, 
            recursoTag, 
            recursoUrl, 
            recursoAtivo, 
            recursoTipoId,
            criadoId,
            NOW(),
            'N'
        );

        SELECT LAST_INSERT_ID() AS id;
END;