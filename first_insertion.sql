use sistema_aluno_ufrrj;

-- Inserir 5 entradas aleatórias na tabela Aluno
INSERT INTO Aluno (nome, dataDeNasc, dataDeMatricula, matricula, email)
VALUES 
    ('Lucas Silva', '1995-06-01', '2019-03-01', '20190017874', 'lucas.silva@gmail.com'),
    ('Julia Santos', '1997-08-18', '2019-02-15', '20190014567', 'julia.santos@gmail.com'),
    ('Marcos Oliveira', '1998-05-12', '2019-02-01', '20190011234', 'marcos.oliveira@gmail.com'),
    ('Isabella Martins', '1996-09-10', '2019-01-02', '20190011478', 'isabella.martins@gmail.com'),
    ('Ricardo Souza', '1999-11-27', '2018-02-20', '20180010012', 'ricardo.souza@gmail.com');

-- Inserir 5 entradas aleatórias na tabela Periodo
INSERT INTO Periodo (codigo, dataInicio, dataFim)
VALUES 
    ('2018.1', '2018-03-01', '2021-06-30'),
    ('2018.2', '2018-07-01', '2021-12-30'),
    ('2019.1', '2019-03-01', '2021-06-30'),
    ('2019.2', '2019-07-01', '2021-12-30'),
    ('2020.1', '2020-03-01', '2021-06-30'),
    ('2020.2', '2020-07-01', '2021-12-30'),
    ('2021.2', '2021-07-01', '2021-12-30'),
    ('2021.1', '2021-03-01', '2021-7-30');

-- Inserir 5 entradas aleatórias na tabela Disciplina
INSERT INTO Disciplina (codigo, departamento, nome, cargaHoraria)
VALUES 
    ('IC160', 'Departamento de Computação', 'Programação I', 60),
    ('IC165', 'Departamento de Computação', 'Programação II', 60),
    ('IC170', 'Departamento de Computação', 'Banco de Dados', 30),
    ('IC175', 'Departamento de Matemática', 'Cálculo I', 30),
    ('IC180', 'Departamento de Matemática', 'Cálculo II', 60);

-- Inserir 5 entradas aleatórias na tabela Turma
INSERT INTO Turma (codigo, professor, codigoDisciplina, sala, horario, codigoPeriodo)
VALUES 
    ('INF001', 'João da Silva', 'IC160', 101, '08:00:00', '2019.1'),
    ('INF002', 'Maria dos Santos', 'IC165', 102, '10:00:00', '2018.2'),
    ('INF003', 'Pedro Paulo', 'IC170', 103, '14:00:00', '2019.1'),
    ('INF004', 'Ana Carolina', 'IC175', 104, '16:00:00', '2020.1'),
    ('INF005', 'Gabriel Souza', 'IC180', 105, '18:00:00', '2021.1'),
    ('INF006', "João da Silva", 'IC160', 101, "08:00:00", "2019.1");

-- Inserir 5 entradas aleatórias na tabela TurmaAluno
INSERT INTO TurmaAluno (alunoId, codigoTurma, nota, resultado)
VALUES 
    (1, 'INF001', 8.5, 'AP'),
    (1, 'INF006', 10.0, 'AP'),
    (1, 'INF002', 7.0, 'AP'),
    (2, 'INF003', 4.0, 'RM'),
    (2, 'INF004', 9.0, 'AP'),
    (3, 'INF005', 8.0, 'AP'),
	(3, 'INF001', 8.5, 'AP'),
    (4, 'INF002', 3.5, 'RM'),
    (4, 'INF003', 6.5, 'RF'),
    (5, 'INF004', 9.0, 'AP'),
    (5, 'INF005', 8.0, 'AP');
    