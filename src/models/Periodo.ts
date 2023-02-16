import { Periodo } from '@prisma/client';
import BasicCrudOperations from 'src/utils/interfaces/BacisCrudOperations';
import { BaseDatabase } from '../../prisma/BaseDatabase';

export default class PeriodoModel implements BasicCrudOperations<Periodo> {
    async getAll() {
        try {
            const periodos = await BaseDatabase.periodo.findMany();
            return periodos;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getById(codigo: string) {
        try {
            const periodo = await BaseDatabase.periodo.findUnique({where: {codigo}});
            return periodo;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(periodo: Periodo) {

        if (!this.dataInicioEFimCoerente(periodo.dataInicio, periodo.dataFim)) {
            return null;
        }
        if (!this.periodoCom90DiasOuMais(periodo.dataInicio, periodo.dataFim)) {
            return null;
        }

        periodo.dataInicio = new Date(periodo.dataInicio);
        periodo.dataFim = new Date(periodo.dataFim);

        try {
            const novoPeriodo = await BaseDatabase.periodo.create({data: periodo});
            return novoPeriodo;
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    async update(codigo: string, periodo: Periodo) {
        if (!this.dataInicioEFimCoerente(periodo.dataInicio, periodo.dataFim)) {
            return null;
        }
        if (!this.periodoCom90DiasOuMais(periodo.dataInicio, periodo.dataFim)) {
            return null;
        }
        
        try {
            const periodoAtualizado = await BaseDatabase.periodo.update({
                where: {
                    codigo,
                },
                data: periodo,
            });
            return periodoAtualizado;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async delete(codigo: string) {
        try {
            const periodoDeletado = await BaseDatabase.periodo.delete({where: {codigo}});
            return periodoDeletado;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    dataInicioEFimCoerente(dataInicio: Date, dataFim: Date) {
        const inicio = new Date(dataInicio).getTime();
        const fim = new Date(dataFim).getTime();

        if (inicio > fim) {
            return false;
        }
        return true;
    }

    periodoCom90DiasOuMais(dataInicio: Date, dataFim: Date) {
        const inicio = new Date(dataInicio).getTime();
        const fim = new Date(dataFim).getTime();
        const diffMilisegundos = Math.abs(fim - inicio);
        const diffDias = Math.ceil(diffMilisegundos / (1000 * 60 * 60 * 24));
        const numSemanas = Math.ceil(diffDias / 7);
        const diasNaoUteis = numSemanas * 2;
        const diasUteis = diffDias - diasNaoUteis;

        if (diasUteis < 90) {
            return null;
        }
        return true;
    }

}