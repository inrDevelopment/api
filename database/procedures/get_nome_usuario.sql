-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_nome_usuario;

CREATE PROCEDURE get_nome_usuario (
    usuarioid INT
)
BEGIN
    SELECT us.nome FROM usuario us WHERE us.idusuario = usuarioid;
END;