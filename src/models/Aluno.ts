import { Aluno } from "@prisma/client";
import BasicCrudOperations from "src/utils/interfaces/BacisCrudOperations";
import { BaseDatabase } from "../prisma/BaseDatabase";

export default class AlunoModel implements BasicCrudOperations<Aluno> {
    async getAll() {
        try {
            const alunos = await BaseDatabase.aluno.findMany();
            return alunos;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getById(id: number) {
        try {
            const aluno = await BaseDatabase.aluno.findUnique({where: {id}})
            return aluno;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async create(aluno: Aluno) {

        if (!this.idadeCoerente(aluno.dataDeNasc)) {
            return null;
        }
        if (!this.matriculaCoerente(aluno.matricula, aluno.dataDeMatricula)) {
            return null;
        }
        try {
            const novoAluno = await BaseDatabase.aluno.create({data: aluno})
            return novoAluno;
            
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async update(id: number, aluno: Aluno) {

        if (!this.idadeCoerente(aluno.dataDeNasc)) {
            return null;
        }
        if (!this.matriculaCoerente(aluno.matricula, aluno.dataDeMatricula)) {
            return null;
        }
        try {
            const alunoAtualizado = await BaseDatabase.aluno.update({
                where: {
                    id,
                },
                data: aluno,
            });
            return alunoAtualizado;
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async delete(id: number) {
        try {
            const alunoDeletado = await BaseDatabase.aluno.delete({where: {id}});
            return alunoDeletado;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    idadeCoerente(dataDeNasc: Date): boolean {
        const anoAtual = new Date().getFullYear();
        const anoNascAluno = new Date(dataDeNasc).getFullYear();
        const idadeAluno = anoAtual - anoNascAluno;
        
        if (idadeAluno < 16 || idadeAluno > 100) {
            return false;
        }
        return true;
    }

    matriculaCoerente(matricula: string, dataDeMatricula: Date) {
        const anoMatricula = new Date(dataDeMatricula).getFullYear();
        const primeiros4DigitosDaMatricula = matricula.slice(0, 4);

        if (anoMatricula !== Number(primeiros4DigitosDaMatricula)) {
            return false;
        }
        return true;
    }

    calculoIRADeUmPeriodo() {

    }

    calculoIRATotal() {

    }

    async consultaNotasDeUmPeriodo(id: number, codigoPeriodo: string) {
        const alunoTurmas = await BaseDatabase.turmaAluno.findMany({
            select: {
                nota: true,
                turma: {
                    include: {
                        disciplina: {
                            select: {
                                cargaHoraria: true,
                            }
                        },
                        periodo: {
                            select: {
                                codigo: true,
                            }
                        }
                    }
                },
            },
            where: {
                alunoId: id,
                turma: {
                    periodo: {
                        codigo: codigoPeriodo,
                    }
                }
            }
        });
        return alunoTurmas;
    }

    async consultaNotasDeTodosOsPeriodos(id: number, codigoPeriodo: string) {
        const alunoTurmas = await BaseDatabase.turmaAluno.findMany({
            select: {
                nota: true,
                turma: {
                    include: {
                        disciplina: {
                            select: {
                                cargaHoraria: true,
                            }
                        },
                        periodo: {
                            select: {
                                codigo: true,
                            }
                        }
                    }
                },
            },
            where: {
                alunoId: id,
            }
        });
        return alunoTurmas;
    }
}