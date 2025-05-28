-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS publicar_boletim;

CREATE PROCEDURE publicar_boletim (
    idBoletim INT,
    idUsuario INT
)
BEGIN
    UPDATE 
        boletim
    SET
        publicado = "S",
        publicado_id = idUsuario, 
        publicado_em = NOW() 
    WHERE 
        id = idBoletim;
END;