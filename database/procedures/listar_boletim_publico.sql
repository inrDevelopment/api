-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS listar_boletim_publico;

CREATE PROCEDURE listar_boletim_publico (
    numero_boletim VARCHAR(10),    
    tipo_id TEXT,
	data_boletim_inicio DATETIME,
	data_boletim_fim DATETIME,
    limite INT,
    pagina INT
)
BEGIN  
	SELECT
		be.id,
		be.titulo,
		be.`data`,
		be.numero
	FROM
		boletim as be
	WHERE 
		(tipo_id IS NULL OR FIND_IN_SET(be.boletim_tipo_id, tipo_id))
	AND 
		(be.numero = numero_boletim OR numero_boletim IS NULL)
	AND 
		(be.`data` >= data_boletim_inicio OR data_boletim_inicio IS NULL)
	AND 
		(be.`data` <= data_boletim_fim OR data_boletim_inicio IS NULL)
	AND 
		be.publicado = "S"
	AND 
		be.exc = "N"
	AND 
		be.excluido_em IS NULL
	AND 
		be.excluido_id IS NULL
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