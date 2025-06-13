-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS count_lista_recurso;

CREATE PROCEDURE count_lista_recurso (
  nomeRecurso VARCHAR(150),
  tipoRecurso INT,
  tagRecurso CHAR(5),
  ativoRecurso BOOLEAN
)
BEGIN
    SELECT 
        COUNT(r.id) as 'count'
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
        r.excluido_id IS NULL;    
END