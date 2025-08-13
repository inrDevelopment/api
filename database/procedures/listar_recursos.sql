-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS listar_recursos;

CREATE PROCEDURE listar_recursos (
  searchText VARCHAR(150),
  tipoRecurso INT,
  ativoRecurso BOOLEAN,
  limite INT,
  pagina INT
)
BEGIN
    SELECT 
        r.id,
        r.nome,
        r.url,
        r.tag,
        r.recurso_tipo_id,
        rt.nome as 'recurso_tipo_nome',
        r.ativo
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
    )
    ORDER BY 
        r.nome ASC,
        r.criado_em DESC
    LIMIT 
        limite
    OFFSET 
        pagina;
END;