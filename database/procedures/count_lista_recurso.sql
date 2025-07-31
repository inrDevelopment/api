-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS count_lista_recurso;

CREATE PROCEDURE count_lista_recurso (
  searchText VARCHAR(150),
  tipoRecurso INT,
  ativoRecurso BOOLEAN
)
BEGIN
    SELECT 
        COUNT(r.id) as "count"
    FROM 
        recurso r
    INNER JOIN 
        recurso_tipo rt 
    ON 
        rt.id = r.recurso_tipo_id
    WHERE 
        r.recurso_tipo_id = tipoRecurso
    AND 
        r.ativo = ativoRecurso
    AND
        r.excluido_em IS NULL
    AND
        r.excluido_id IS NULL
    AND
        r.exc = "N"
    AND (
        searchText IS NULL 
        OR 
            r.nome LIKE CONCAT(searchText, '%') 
        OR 
            r.url LIKE CONCAT(searchText, '%') 
        OR 
            r.tag LIKE CONCAT(searchText, '%')
    );
END