create database ESTOQUE

use ESTOQUE

CREATE TABLE Usuario (
	ID int primary key identity, 
    NomeUsuario VARCHAR(50) unique,
	Senha varchar(50),
    NomeCompleto VARCHAR(100),
    DataNascimento DATE,
    CPF VARCHAR(14), 
    Email VARCHAR(100),    
);


CREATE TABLE Estoque (
    ID INT PRIMARY KEY identity,
    NomeProduto VARCHAR(100),
	Fabricante varchar(50),
    Quantidade INT,
    PrecoUnitario DECIMAL(10, 2),
);

select * from Estoque
select * from Usuario

CREATE TABLE LogEntradaSaida (
    ID INT PRIMARY KEY identity,
    ProdutoID INT,
    Quantidade INT,
    TipoMovimento varchar(10),
    DataMovimento DATE,
    FOREIGN KEY (ProdutoID) REFERENCES Estoque(ID)
);


select * from LogEntradaSaida

create login adm with password='senha1234'
create user Fernando from login adm;

INSERT INTO Usuario (NomeUsuario, Senha, NomeCompleto, DataNascimento, CPF, Email)
VALUES
('Fernandobsa', '123456', 'Fernando Barros de sa', '1994-12-08', '104.498.264-06', 'fernandobarrosdesak@gmail.com')

--Scaffold-DbContext "Data Source=localhost; initial Catalog=ESTOQUE;User ID=Fernando;password=senha1234;language=Portuguese;Trusted_Connection=True;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -o "Models"




