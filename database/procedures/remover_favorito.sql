-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS remover_favorito;

CREATE PROCEDURE remover_favorito (
    idBoletim INT,
    idUsuario INT
)
BEGIN
    DELETE 
    FROM 
        boletim_favorito 
    WHERE 
        boletim_id = idBoletim 
    AND 
        usuario_id = idUsuario;    
END;