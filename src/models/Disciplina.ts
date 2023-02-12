import { BaseDatabase } from "../prisma/BaseDatabase";

interface IDisciplina {
    codigo: string; 
    departamento: string; 
    nome: string; 
    cargaHoraria: number;
}
export default class DisciplinaModel {
    async getAll() {
        try {
            const disciplina = await BaseDatabase.disciplina.findMany();
            return disciplina;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async getById(codigo: string) {
        try {
            const disciplina = await BaseDatabase.disciplina.findUnique({where: {codigo}});
            return disciplina;
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