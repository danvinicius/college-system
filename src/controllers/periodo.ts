import { Request, Response } from 'express';
import PeriodoModel from '../models/Periodo';
import { Periodo } from '@prisma/client';

const model = new PeriodoModel();

export default class PeriodoController {
    async getAll(req: Request, res: Response) {
        const periodos: Periodo[] | null = await model.getAll();
        if (periodos) {
            return res.status(200).json(periodos);
        }
        return res.status(400).json({err: 'Bad request'});
        
    }

    async getById(req: Request, res: Response) {
        const {codigo} = req.params;
        const periodo: Periodo | null = await model.getById(codigo);
        if (periodo) {
            return res.status(200).json(periodo);
        }
        return res.status(400).json({err: 'Bad request'});
    }
    
    async create(req: Request, res: Response) {
        const periodo: Periodo = req.body;
        const periodoCriado: Periodo | null = await model.create(periodo);
        if (periodoCriado) {
            return res.status(200).json(periodoCriado);
        }
        return res.status(400).json({err: 'Bad request'});
    }
    
    async update(req: Request, res: Response) {
        const {codigo} = req.params;
        const periodo: Periodo = req.body;
        const periodoAtualizado: Periodo | null = await model.update(codigo, periodo);
        if (periodoAtualizado) {
            return res.status(200).json(periodoAtualizado);
        }
        return res.status(400).json({err: 'Bad request'});
    }
    
    async delete(req: Request, res: Response) {
        const {codigo} = req.params;
        const periodoDeletado: Periodo | null = await model.delete(codigo);
        if (periodoDeletado) {
            return res.status(200).json(periodoDeletado);
        }
        return res.status(400).json({err: 'Bad request'});
    }
}