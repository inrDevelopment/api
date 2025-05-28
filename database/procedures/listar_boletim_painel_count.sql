-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS listar_boletim_painel_count;

CREATE PROCEDURE listar_boletim_painel_count (
    searchText VARCHAR(200),    
    tipo_id INT,
	data_boletim DATETIME
)
BEGIN
    SELECT
		count(be.id) as "count"
	FROM boletim as be
	WHERE  be.titulo LIKE CONCAT(searchText, '%')
	AND be.boletim_tipo_id = tipo_id
	AND be.`data` = data_boletim
	AND be.exc = "N"
	AND be.excluido_em IS NULL
	AND be.excluido_em IS NULL;
END;