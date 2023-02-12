import { BaseDatabase } from "../prisma/BaseDatabase";

interface IPeriodo {
    codigo: string;
    dataInicio: string;
    dataFim: string;
}

export default class PeriodoModel {
    async getAll() {
        try {
            const periodos = await BaseDatabase.periodo.findMany();
            return periodos;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async getById(codigo: string) {
        try {
            const periodo = await BaseDatabase.periodo.findUnique({where: {codigo}});
            return periodo;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async create(periodo: IPeriodo) {
        const dataInicio = new Date(periodo.dataInicio).getTime();
        const dataFim = new Date(periodo.dataFim).getTime();
        const diffMilisegundos = Math.abs(dataFim - dataInicio);

        if (dataInicio > dataFim) {
            // lança erro personalizado
            return false;
        }

        const diffDias = Math.ceil(diffMilisegundos / (1000 * 60 * 60 * 24));
        const numSemanas = Math.ceil(diffDias / 7);
        const diasNaoUteis = numSemanas * 2;
        const diasUteis = diffDias - diasNaoUteis;

        if (diasUteis < 90) {
            // lança erro personalizado
            return false;
        }

        try {
            const novoPeriodo = await BaseDatabase.periodo.create({data: periodo});
            return novoPeriodo;
            
        } catch (error) {
            //erro personalizado
            return false;
        }

    }
    async update() {
        
    }
    async delete() {
        
    }
}