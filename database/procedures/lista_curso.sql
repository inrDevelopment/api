-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS lista_curso;

CREATE PROCEDURE lista_curso (
    limite INT,
    pagina INT
)
BEGIN
    SELECT 
        c.idcurso as 'id',
        c.titulo,
        c.data_divulgacao as 'datacad'
    FROM 
        curso c 
    WHERE 
        c.exc = "N"
    ORDER BY
        c.idcurso DESC
    LIMIT
        limite
    OFFSET
        pagina;
END;