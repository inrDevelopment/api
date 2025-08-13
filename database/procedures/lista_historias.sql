-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS lista_historias;

CREATE PROCEDURE lista_historias (
    limite INT,
    pagina INT
)
BEGIN
    SELECT 
        h.idhistoria as 'id',
        h.titulo,
        h.dt_aprovacao as 'datacad'
    FROM 
        historia h
    WHERE 
        exec = "N"
    ORDER BY
        h.idhistoria DESC
    LIMIT limite
    OFFSET pagina;
END;