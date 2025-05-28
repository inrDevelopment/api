-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS listar_boletim_painel;

CREATE PROCEDURE listar_boletim_painel (
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
        be.favorito,
        be.aprovado
	FROM boletim as be
	WHERE  be.titulo LIKE CONCAT(searchText, '%')
	AND be.boletim_tipo_id = tipo_id
	AND be.`data` = data_boletim
	AND be.exc = "N"
	AND be.excluido_em IS NULL
	AND be.excluido_em IS NULL
	ORDER BY 
		be.numero DESC, 
		be.`data` DESC
	LIMIT limite
	OFFSET pagina;
END;