/*
  Warnings:

  - You are about to alter the column `matricula` on the `aluno` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE `aluno` MODIFY `matricula` VARCHAR(11) NOT NULL;
