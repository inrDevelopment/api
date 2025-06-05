-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS ultimo_conteudo;

CREATE PROCEDURE ultimo_conteudo (
    tipo_id INT
)
BEGIN
    SELECT
        b.id,
        b.titulo,
        b.`data`,
        b.numero
    FROM
        boletim b
    WHERE
        b.numero = (
            SELECT
                MAX(be.numero)
            FROM
                boletim be
            WHERE
                be.boletim_tipo_id = tipo_id
        )
    AND b.aprovado = 'S'
    AND b.publicado = 'S'
    AND b.exc = 'N'
    AND b.ativo = TRUE;
END;