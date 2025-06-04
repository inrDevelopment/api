-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS remove_leitura;

CREATE PROCEDURE remove_leitura (
    idBoletim INT,
    idUsuario INT
)
BEGIN
    DELETE 
    FROM 
        boletim_leitura 
    WHERE 
        boletim_id = idBoletim 
    AND 
        usuario_id = idUsuario;
END;