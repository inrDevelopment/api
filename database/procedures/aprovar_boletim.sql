-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS aprovar_boletim;

CREATE PROCEDURE aprovar_boletim (
    idBoletim INT,
    idUsuario INT
)
BEGIN
    UPDATE 
        boletim 
    SET 
        aprovado = "S", 
        aprovado_id = idUsuario, 
        aprovado_em = NOW() 
    WHERE 
        id = idBoletim;
END;