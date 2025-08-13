-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS listar_boletim_painel_count;

CREATE PROCEDURE listar_boletim_painel_count (
	num INT,
    tipo_id INT(200),
    data_boletim DATETIME
)
BEGIN
	SELECT
		COUNT(be.id) as 'count'
	FROM 
		boletim as be
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
		be.excluido_id IS NULL;
END;