import { Aluno } from '@prisma/client';
import BasicCrudOperations from 'src/interfaces/BacisCrudOperations';
import { BaseDatabase } from '../../prisma/BaseDatabase';

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
    async getById(matricula: string) {
        try {
            const aluno = await BaseDatabase.aluno.findUnique({where: {matricula}});
            return aluno;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(aluno: Aluno) {

        if (!this.idadeCoerente(aluno.dataDeNasc)) {
            return null;
        }
        if (!this.matriculaCoerente(aluno.matricula, aluno.dataDeMatricula)) {
            return null;
        }

        aluno.dataDeNasc = new Date(aluno.dataDeNasc);
        aluno.dataDeMatricula = new Date(aluno.dataDeMatricula);
        
        try {
            const novoAluno = await BaseDatabase.aluno.create({data: aluno});
            return novoAluno;
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(matricula: string, aluno: Aluno) {

        if (aluno.dataDeNasc) {
            aluno.dataDeNasc = new Date(aluno.dataDeNasc);
            if (!this.idadeCoerente(aluno.dataDeNasc)) {
                return null;
            }
        }
        if (aluno.dataDeMatricula && !aluno.matricula) {
            aluno.dataDeMatricula = new Date(aluno.dataDeMatricula);
            if (!this.matriculaCoerente(matricula, aluno.dataDeMatricula)) {
                return null;
            }
        }
        if (aluno.matricula && !aluno.dataDeMatricula) {
            const buscaData = await BaseDatabase.aluno.findUnique({where: {matricula}});
            const dataDeMatricula = buscaData?.dataDeMatricula;
            if (dataDeMatricula) {
                if (!this.matriculaCoerente(aluno.matricula, dataDeMatricula)) {
                    return null;
                }
            }
        }
        if (aluno.dataDeMatricula && aluno.matricula) {
            aluno.dataDeMatricula = new Date(aluno.dataDeMatricula);
            if (!this.matriculaCoerente(aluno.matricula, aluno.dataDeMatricula)) {
                return null;
            }
        }
        
        try {
            const alunoAtualizado = await BaseDatabase.aluno.update({
                where: {
                    matricula,
                },
                data: aluno,
            });
            return alunoAtualizado;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async delete(matricula: string) {
        try {
            const alunoDeletado = await BaseDatabase.aluno.delete({where: {matricula}});
            return alunoDeletado;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    idadeCoerente(dataDeNasc: Date): boolean {
        const anoAtual = new Date().getFullYear();
        const anoNascAluno = new Date(dataDeNasc).getFullYear();
        const idadeAluno = anoAtual - anoNascAluno;
        
        if (idadeAluno < 16 || idadeAluno > 100) {
            console.log('Data de nascimento incoerente');
            return false;
        }
        return true;
    }

    matriculaCoerente(matricula: string, dataDeMatricula: Date) {
        const anoMatricula = new Date(dataDeMatricula).getFullYear();
        const primeiros4DigitosDaMatricula = matricula.slice(0, 4);

        if (anoMatricula !== Number(primeiros4DigitosDaMatricula)) {
            console.log('Matrícula incoerente');
            return false;
        }
        return true;
    }

    async calculoIRADeUmPeriodo(matricula: string, periodo: string) {
        const notasAluno = await this.consultaNotasDeUmPeriodo(matricula, periodo);
        const notas = notasAluno.map(n => n.nota);
        const cargasHorarias = notasAluno.map(n => n.turma.disciplina.cargaHoraria);
        let somaPonderada = 0;
        const somaCargasHorarias = cargasHorarias.reduce((acc, curr) => acc + curr, 0);
        for (let i = 0; i < notas.length; i++) {
            somaPonderada += (notas[i] * cargasHorarias[i]);
        }
        const mediaPonderada = somaPonderada / somaCargasHorarias;
        
        const resultados = notasAluno.map(n => {
            return {
                turma: n.turma.codigo, 
                resultado: n.resultado
            };
        });
        return {
            mediaPonderada,
            resultados,
        };
        
    }
    
    async calculoIRATotal(matricula: string) {
        const notasAluno = await this.consultaNotasDeTodosOsPeriodos(matricula);
        console.log(notasAluno);
        const notas = notasAluno.map(n => n.nota);
        const cargasHorarias = notasAluno.map(n => n.turma.disciplina.cargaHoraria);
        let somaPonderada = 0;
        const somaCargasHorarias = cargasHorarias.reduce((acc, curr) => acc + curr, 0);
        for (let i = 0; i < notas.length; i++) {
            somaPonderada += (notas[i] * cargasHorarias[i]);
        }
        const mediaPonderada = somaPonderada / somaCargasHorarias;
        
        const resultados = notasAluno.map(n => {
            return {
                turma: n.turma.codigo, 
                resultado: n.resultado
            };
        });
        console.log(mediaPonderada);
        
        return {
            mediaPonderada,
            resultados,
        };
    }
    
    async consultaNotasDeUmPeriodo(matricula: string, codigoPeriodo: string) {
        const notasAluno = await BaseDatabase.turmaAluno.findMany({
            select: {
                nota: true,
                resultado: true,
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
                aluno: {
                    matricula,
                },
                turma: {
                    periodo: {
                        codigo: codigoPeriodo,
                    }
                }
            }
        });
        return notasAluno;
    }

    async consultaNotasDeTodosOsPeriodos(matricula: string) {
        const notasAluno = await BaseDatabase.turmaAluno.findMany({
            select: {
                nota: true,
                resultado: true,
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
                aluno: {
                    matricula,
                }
            }
        });
        return notasAluno;
    }
}