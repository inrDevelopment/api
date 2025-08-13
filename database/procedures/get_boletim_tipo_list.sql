-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_boletim_tipo_list;

CREATE PROCEDURE get_boletim_tipo_list ()
BEGIN
    SELECT 
        id,
        nome 
    FROM boletim_tipo;
END;