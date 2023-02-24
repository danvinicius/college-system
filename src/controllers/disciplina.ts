import { Request, Response } from 'express';
import DisciplinaModel from '../models/Disciplina';
import { Disciplina } from '@prisma/client';

const model = new DisciplinaModel();

export default class DisciplinaController {
    async getAll(req: Request, res: Response) {
        const disciplinas: Disciplina[] | null = await model.getAll();
        if (disciplinas) {
            return res.status(200).json(disciplinas);
        }
        return res.status(400).json({err: 'Bad request'});
        
    }

    async getById(req: Request, res: Response) {
        const {codigo} = req.params;
        const disciplina: Disciplina | null = await model.getById(codigo);
        if (disciplina) {
            return res.status(200).json(disciplina);
        }
        return res.status(400).json({err: 'Bad request'});
    }
    
    async create(req: Request, res: Response) {
        const disciplina: Disciplina = req.body;
        const disciplinaCriada: Disciplina | null = await model.create(disciplina);
        if (disciplinaCriada) {
            return res.status(200).json(disciplinaCriada);
        }
        return res.status(400).json({err: 'Bad request'});
    }
    
    async update(req: Request, res: Response) {
        const {codigo} = req.params;
        const disciplina: Disciplina = req.body;
        const disciplinaAtualizada: Disciplina | null = await model.update(codigo, disciplina);
        if (disciplinaAtualizada) {
            return res.status(200).json(disciplinaAtualizada);
        }
        return res.status(400).json({err: 'Bad request'});
    }
    
    async delete(req: Request, res: Response) {
        const {codigo} = req.params;
        const disciplinaDeletada: Disciplina | null = await model.delete(codigo);
        if (disciplinaDeletada) {
            return res.status(200).json(disciplinaDeletada);
        }
        return res.status(400).json({err: 'Bad request'});
    }
}