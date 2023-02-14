import { Disciplina } from "@prisma/client";
import BasicCrudOperations from "src/utils/interfaces/BacisCrudOperations";
import { BaseDatabase } from "../../prisma/BaseDatabase";

export default class DisciplinaModel implements BasicCrudOperations<Disciplina> {
    async getAll() {
        try {
            const disciplina = await BaseDatabase.disciplina.findMany();
            return disciplina;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async getById(codigo: string) {
        try {
            const disciplina = await BaseDatabase.disciplina.findUnique({where: {codigo}});
            return disciplina;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(disciplina: Disciplina) {        
        try {
            const novaDisciplina = await BaseDatabase.disciplina.create({data: disciplina})
            return novaDisciplina;
            
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async update(codigo: string, disciplina: Disciplina) {
        try {
            const disciplinaAtualizada = await BaseDatabase.disciplina.update({
                where: {
                    codigo,
                },
                data: disciplina,
            });
            return disciplinaAtualizada;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async delete(codigo: string) {
        try {
            const disciplinaDeletada = await BaseDatabase.disciplina.delete({where: {codigo}});
            return disciplinaDeletada;
        } catch (error) {
            console.log(error);
            return null
        }
    }
}