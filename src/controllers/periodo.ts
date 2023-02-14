import { Request, Response } from 'express';

import PeriodoModel from 'src/models/Periodo';
import { Periodo } from '@prisma/client';

const model = new PeriodoModel();

export default class PeriodoController {
    async getAll(req: Request, res: Response) {
        const periodos: Periodo[] | null = await model.getAll();
        if (periodos) {
            return res.json(periodos).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
        
    }

    async getById(req: Request, res: Response) {
        const {codigo} = req.params;
        const periodo: Periodo | null = await model.getById(codigo);
        if (periodo) {
            return res.json(periodo).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async create(req: Request, res: Response) {
        const periodo: Periodo = req.body;
        const periodoCriado: Periodo | null = await model.create(periodo);
        if (periodoCriado) {
            return res.json(periodoCriado).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async update(req: Request, res: Response) {
        const {codigo} = req.params;
        const periodo: Periodo = req.body;
        const periodoAtualizado: Periodo | null = await model.update(codigo, periodo);
        if (periodoAtualizado) {
            return res.json(periodoAtualizado).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async delete(req: Request, res: Response) {
        const {codigo} = req.params;
        const periodoDeletado: Periodo | null = await model.delete(codigo);
        if (periodoDeletado) {
            return res.json(periodoDeletado).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
}