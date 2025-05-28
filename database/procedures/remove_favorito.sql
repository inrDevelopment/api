-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS remove_favorito;

CREATE PROCEDURE remove_favorito (
    idBoletim INT,
    idUsuario INT
)
BEGIN
    INSERT INTO 
        boletim_favorito (
            boletim_id,
            usuario_id
        ) 
    VALUES (
        idBoletim,
        idUsuario
    );
END;