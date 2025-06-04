-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS listar_favoritos_count;

CREATE PROCEDURE listar_favoritos_count (
    idUsuario INT,
    numero_boletim VARCHAR(10),
    tipo_id TEXT,
    data_boletim_inicio DATETIME,
    data_boletim_fim DATETIME
)
BEGIN
    SELECT 
        COUNT(bf.boletim_id) as 'count'
    FROM 
        boletim_favorito as bf
    INNER JOIN 
        boletim be 
    ON 
        be.id = bf.boletim_id
    WHERE 
        bf.usuario_id = idUsuario
    AND
        (tipo_id IS NULL OR FIND_IN_SET(be.boletim_tipo_id, tipo_id))
    AND 
		(be.numero = numero_boletim OR numero_boletim IS NULL)         
    AND 
        be.aprovado = 'S'
    AND 
        be.publicado = 'S'
    AND 
        be.exc = "N"
    AND 
        be.ativo = true;
END;