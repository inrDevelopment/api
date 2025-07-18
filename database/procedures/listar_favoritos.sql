-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS listar_favoritos;

CREATE PROCEDURE listar_favoritos (
    idUsuario INT,
    numero_boletim VARCHAR(10),    
    tipo_id TEXT,
	data_boletim_inicio DATETIME,
	data_boletim_fim DATETIME,
    limite INT,
    pagina INT
)
BEGIN
    SELECT 
        bf.boletim_id as 'id',
        be.titulo,
        be.`data`,
        be.numero,
        be.boletim_tipo_id,
        (SELECT 
			true 
		FROM 
			boletim_leitura as bl 
		WHERE 
			bl.boletim_id = bf.boletim_id
		AND bl.usuario_id = idUsuario
        LIMIT 1
		) AS 'lido'
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
        be.ativo = true
    ORDER BY 
		be.numero DESC, 
		be.`data` DESC
	LIMIT 
		limite
	OFFSET 
		pagina;
END;