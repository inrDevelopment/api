-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_marcacao_leitura;

CREATE PROCEDURE verifica_marcacao_leitura (
    idBoletim INT,
    idUsuario INT
)
BEGIN
    SELECT 
        COUNT(bl.id) as 'count' 
    FROM 
        boletim_leitura as bl 
    WHERE 
        bl.boletim_id = idBoletim 
    AND 
        bl.usuario_id = idUsuario;
END;