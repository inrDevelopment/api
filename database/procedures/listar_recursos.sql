-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS listar_recursos;

CREATE PROCEDURE listar_recursos (
  nomeRecurso VARCHAR(150),
  tipoRecurso INT,
  tagRecurso CHAR(5),
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
        (nomeRecurso IS NULL OR r.nome LIKE CONCAT(nomeRecurso, '%'))
    AND 
        (tipoRecurso IS NULL OR r.recurso_tipo_id = tipoRecurso)
    AND
        (tagRecurso IS NULL OR r.tag LIKE CONCAT(tagRecurso, '%'))
    AND 
        (ativoRecurso IS NULL OR r.ativo = ativoRecurso)        
    AND 
        r.exc = 'N'
    AND 
        r.excluido_em IS NULL
    AND 
        r.excluido_id IS NULL
    ORDER BY 
        r.nome ASC,
        r.criado_em DESC
    LIMIT 
        limite
    OFFSET 
        pagina;
END;