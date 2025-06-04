-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verifica_favorito;

CREATE PROCEDURE verifica_favorito (
    idBoletim INT,
    idUsuario INT
)
BEGIN
    SELECT 
        COUNT(bf.id) as 'count'
    FROM 
        boletim_favorito as bf 
    WHERE 
        bf.boletim_id = idBoletim 
    AND 
        bf.usuario_id = idUsuario;
END;