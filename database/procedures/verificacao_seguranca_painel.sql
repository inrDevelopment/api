-- Active: 1744652968446@@inrpublicacoes.mysql.dbaas.com.br@3306@inrpublicacoes
DROP PROCEDURE IF EXISTS verificacao_seguranca_painel;

CREATE PROCEDURE verificacao_seguranca_painel (
    inputLogin VARCHAR(20),
    inputPassword CHAR(32)
)
BEGIN
    SELECT 
        u.idusuario, 
        u.idgrupo, 
        u.nome, 
        a.idacesso, 
        a.datalog, 
        u.nivel_consultor, 
        g.consultoria,
        DATE_FORMAT(a.datalog, '%d/%m/%Y às %H:%i') AS 'data_ultimo_acesso'
    FROM 
        usuario u, 
        acesso a, 
        grupo g
    WHERE 
        u.exc = 'N' 
    AND 
        a.idusuario = u.idusuario 
    AND
        u.idgrupo = g.idgrupo 
    AND 
        u.login = inputLogin 
    AND
        u.senha = inputPassword
    ORDER BY 
        a.idacesso DESC
    LIMIT 1;
END;