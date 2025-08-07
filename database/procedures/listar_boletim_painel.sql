-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS listar_boletim_painel;

CREATE PROCEDURE listar_boletim_painel (
	num INT,
    tipo_id INT(200),    
    data_boletim DATETIME,
    limite INT,
    pagina INT
)
BEGIN
    SELECT
		be.id, 
		be.titulo,
		be.numero,
		bt.nome as 'tipo',
		DATE_FORMAT(be.`data`, '%d/%m/%Y') as 'data'
	FROM 
		boletim as be
	INNER JOIN 
		boletim_tipo bt 
		ON bt.id = be.boletim_tipo_id
	WHERE 
		(num IS NULL OR be.numero = num) 
	AND 
		(tipo_id IS NULL OR be.boletim_tipo_id = tipo_id)
	AND 
		(data_boletim IS NULL OR be.`data` = data_boletim)
	AND 
		be.exc = "N"
	AND 
		be.excluido_em IS NULL
	AND 
		be.excluido_id IS NULL
	ORDER BY 
		be.`data` DESC,
		be.numero DESC,
		be.boletim_tipo_id ASC 
	LIMIT 
		limite
	OFFSET 
		pagina;
END;