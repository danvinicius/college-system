import { BaseDatabase } from "../prisma/BaseDatabase";

interface ITurma {
    codigo: string;
    professor: string;
    codigoDisciplina: string;
    sala: number;
    horario: string;
    codigoPeriodo: string;
}
export default class TurmaModel {
    async getAll() {
        try {
            const turma = await BaseDatabase.turma.findMany();
            return turma;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async getById(codigo: string) {
        try {
            const turma = await BaseDatabase.turma.findUnique({where: {codigo}});
            return turma;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async create() {
        
    }
    async update() {
        
    }
    async delete() {
        
    }
}