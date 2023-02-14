-- CreateTable
CREATE TABLE `Aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `dataDeNasc` DATE NOT NULL,
    `dataDeMatricula` DATE NOT NULL,
    `matricula` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `codigo` VARCHAR(6) NOT NULL,
    `professor` VARCHAR(6) NOT NULL,
    `codigoDisciplina` VARCHAR(191) NOT NULL,
    `sala` INTEGER NOT NULL,
    `horario` TIME NOT NULL,
    `codigoPeriodo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TurmaAluno` (
    `alunoId` INTEGER NOT NULL,
    `codigoTurma` VARCHAR(191) NOT NULL,
    `nota` DOUBLE NOT NULL,
    `resultado` ENUM('AP', 'RM', 'RF') NOT NULL,

    PRIMARY KEY (`alunoId`, `codigoTurma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disciplina` (
    `codigo` VARCHAR(6) NOT NULL,
    `departamento` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `cargaHoraria` INTEGER NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodo` (
    `codigo` VARCHAR(6) NOT NULL,
    `dataInicio` DATE NOT NULL,
    `dataFim` DATE NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_codigoDisciplina_fkey` FOREIGN KEY (`codigoDisciplina`) REFERENCES `Disciplina`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_codigoPeriodo_fkey` FOREIGN KEY (`codigoPeriodo`) REFERENCES `Periodo`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmaAluno` ADD CONSTRAINT `TurmaAluno_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurmaAluno` ADD CONSTRAINT `TurmaAluno_codigoTurma_fkey` FOREIGN KEY (`codigoTurma`) REFERENCES `Turma`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;
