-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS get_paginated_members;

CREATE PROCEDURE get_paginated_members (
    limite INT,
    pagina INT
)
BEGIN
    SELECT 
        ca.token
    FROM 
        canal_app ca    
    LIMIT 
        limite
    OFFSET 
        pagina;
END