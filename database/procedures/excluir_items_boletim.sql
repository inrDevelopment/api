-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS excluir_items_boletim;

CREATE PROCEDURE excluir_items_boletim (
    idboletim INT
)
BEGIN
   DELETE FROM 
    boletim_conteudo
   WHERE 
    boletim_id = idboletim;
END;