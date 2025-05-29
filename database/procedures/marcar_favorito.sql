-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS marcar_favorito;

CREATE PROCEDURE marcar_favorito (
    idBoletim INT,
    idUsuario INT
)
BEGIN
    INSERT INTO 
        boletim_leitura (
            boletim_id,
            usuario_id
        ) 
    VALUES (
        idBoletim,
        idUsuario
    );
END;