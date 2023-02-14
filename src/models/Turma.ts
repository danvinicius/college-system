import { Turma } from "@prisma/client";
import BasicCrudOperations from "src/utils/interfaces/BacisCrudOperations";
import { BaseDatabase } from "../../prisma/BaseDatabase";

export default class TurmaModel implements BasicCrudOperations<Turma> {
    async getAll() {
        try {
            const turma = await BaseDatabase.turma.findMany();
            return turma;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getById(codigo: string) {
        try {
            const turma = await BaseDatabase.turma.findUnique({where: {codigo}});
            return turma;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(turma: Turma) {
        try {
            const novaTurma = await BaseDatabase.turma.create({data: turma})
            return novaTurma;
            
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async update(codigo: string, turma: Turma) {
        try {
            const turmaAtualizada = await BaseDatabase.turma.update({
                where: {
                    codigo,
                },
                data: turma,
            });
            return turmaAtualizada;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async delete(codigo: string) {
        try {
            const turmaDeletada = await BaseDatabase.turma.delete({where: {codigo}});
            return turmaDeletada;
        } catch (error) {
            console.log(error);
            return null
        }
    }
}