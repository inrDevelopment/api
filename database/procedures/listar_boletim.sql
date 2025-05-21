-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS listar_boletim;

CREATE PROCEDURE listar_boletim (
    searchText VARCHAR(200),    
    tipo_id INT,
	data_boletim DATETIME,
    limite INT,
    pagina INT
)
BEGIN  
	SELECT
		be.id, 
		be.titulo,
		be.`data`,
		be.numero,
		CASE 
			WHEN bf.id IS NOT NULL THEN 'S'
			ELSE  'N'
		END AS 'lido',
		CASE 
			WHEN bl.id IS NOT NULL THEN 'S'
			ELSE  'N'
		END AS 'favorito'
	FROM boletim as be
	LEFT JOIN boletim_favorito bf 
		ON bf.boletim_id = be.id
	LEFT JOIN boletim_leitura bl 
		ON bl.boletim_id = be.id
	WHERE 
		be.titulo LIKE CONCAT(searchText, '%')
	AND 
		be.boletim_tipo_id = tipo_id
	AND 
		be.`data` = data_boletim
	AND
		be.exc = "N"
	AND 
		be.excluido_em IS NULL
	AND 
		be.excluido_em IS NULL
	ORDER BY 
		be.`data` DESC
	LIMIT 
		limite
	OFFSET 
		pagina;
END;