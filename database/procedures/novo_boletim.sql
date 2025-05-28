-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS novo_boletim;

CREATE PROCEDURE novo_boletim (
    IN boletimtitulo VARCHAR(200),
    IN boletimnumero VARCHAR(10),
    IN boletimtipo INT,
    IN boletimdata char(10),
    IN boletimcriado_id INT
)
BEGIN
    INSERT INTO boletim (
        titulo, 
        numero, 
        boletim_tipo_id, 
        `data`, 
        aprovado, 
        publicado, 
        vizualizacao, 
        favorito, 
        ativo, 
        criado_id, 
        criado_em, 
        exc
    ) VALUES (
        boletimtitulo,
        boletimnumero,
        boletimtipo,
        boletimdata,
        'N',
        'N',
        0,
        0,
        TRUE,
        boletimcriado_id,
        NOW(),
        'N'
    );

    SELECT LAST_INSERT_ID() AS boletim_id;
END;