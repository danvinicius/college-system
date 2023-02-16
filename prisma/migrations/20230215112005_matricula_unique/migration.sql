/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Aluno_matricula_key` ON `Aluno`(`matricula`);
