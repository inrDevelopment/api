-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS favoritar_boletim;

CREATE PROCEDURE favoritar_boletim (
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