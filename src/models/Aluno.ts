import { BaseDatabase } from "../prisma/BaseDatabase";

interface IAluno {
    nome: string;
    dataDeNasc: string;
    dataDeMatricula: string;
    matricula: string;
    email: string;
}

export default class AlunoModel {
    async getAll() {
        try {
            const alunos = await BaseDatabase.aluno.findMany();
            return alunos;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async getById(id: number) {
        try {
            const aluno = await BaseDatabase.aluno.findUnique({where: {id}})
            return aluno;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async create(aluno: IAluno) {
        const anoAtual = new Date().getFullYear();
        const anoNascAluno = new Date(aluno.dataDeNasc).getFullYear();
        const idadeAluno = anoAtual - anoNascAluno;
        
        if (idadeAluno < 16 || idadeAluno > 100) {
            //erro personalizado
            return false;
        }
        
        const anoMatricula = new Date(aluno.dataDeMatricula).getFullYear();
        const primeiros4DigitosDaMatricula = aluno.matricula.slice(0, 4);

        if (anoMatricula !== Number(primeiros4DigitosDaMatricula)) {
            //erro personalizado
            return false;
        }
        
        try {
            const novoAluno = await BaseDatabase.aluno.create({data: aluno})
            return true;
            
        } catch (error) {
            //erro personalizado
            console.log(error);
            return false
        }
    }
    async update() {
        
    }
    async delete() {
        
    }
}