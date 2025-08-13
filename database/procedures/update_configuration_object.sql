-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes

DROP PROCEDURE IF EXISTS update_configuration_object;

CREATE PROCEDURE update_configuration_object (
    valorString TEXT
)
BEGIN
    UPDATE config SET valor = valorString WHERE idconfig = 17;
END;