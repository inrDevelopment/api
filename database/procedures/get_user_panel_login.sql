-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_user_panel_login;

CREATE PROCEDURE get_user_panel_login (
    loginusuario VARCHAR(20)
)
BEGIN
    SELECT 
        idusuario,
        DATE_FORMAT(datacad, '%d/%m/%Y') AS 'datacad'
    FROM 
        usuario 
    WHERE 
        exc = "N" 
    AND 
        login = loginusuario;
END;