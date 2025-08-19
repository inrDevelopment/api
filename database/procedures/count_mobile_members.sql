-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS count_mobile_members;

CREATE PROCEDURE count_mobile_members ()
BEGIN
    SELECT COUNT(ca.id) as "count" FROM canal_app ca;
END