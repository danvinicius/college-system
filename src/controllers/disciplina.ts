import { Request, Response } from 'express';
import DisciplinaModel from '../models/Disciplina';
import { Disciplina } from '@prisma/client';

const model = new DisciplinaModel();

export default class DisciplinaController {
    async getAll(req: Request, res: Response) {
        const disciplinas: Disciplina[] | null = await model.getAll();
        if (disciplinas) {
            return res.json(disciplinas).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
        
    }

    async getById(req: Request, res: Response) {
        const {codigo} = req.params;
        const disciplina: Disciplina | null = await model.getById(codigo);
        if (disciplina) {
            return res.json(disciplina).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async create(req: Request, res: Response) {
        const disciplina: Disciplina = req.body;
        const disciplinaCriada: Disciplina | null = await model.create(disciplina);
        if (disciplinaCriada) {
            return res.json(disciplinaCriada).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async update(req: Request, res: Response) {
        const {codigo} = req.params;
        const disciplina: Disciplina = req.body;
        const disciplinaAtualizada: Disciplina | null = await model.update(codigo, disciplina);
        if (disciplinaAtualizada) {
            return res.json(disciplinaAtualizada).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async delete(req: Request, res: Response) {
        const {codigo} = req.params;
        const disciplinaDeletada: Disciplina | null = await model.delete(codigo);
        if (disciplinaDeletada) {
            return res.json(disciplinaDeletada).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
}