import { Request, Response } from 'express';
import TurmaModel from '../models/Turma';
import { Turma, TurmaAluno } from '@prisma/client';

const model = new TurmaModel();

export default class TurmaController {
    async getAll(req: Request, res: Response) {
        const turmas: Turma[] | null = await model.getAll();
        if (turmas) {
            return res.json(turmas).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
        
    }

    async getById(req: Request, res: Response) {
        const {codigo} = req.params;
        const turma: Turma | null = await model.getById(codigo);
        if (turma) {
            return res.json(turma).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async create(req: Request, res: Response) {
        const turma: Turma = req.body;
        const turmaCriada: Turma | null = await model.create(turma);
        if (turmaCriada) {
            return res.json(turmaCriada).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async update(req: Request, res: Response) {
        const {codigo} = req.params;
        const turma: Turma = req.body;
        const turmaAtualizada: Turma | null = await model.update(codigo, turma);
        if (turmaAtualizada) {
            return res.json(turmaAtualizada).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async delete(req: Request, res: Response) {
        const {codigo} = req.params;
        const turmaDeletada: Turma | null = await model.delete(codigo);
        if (turmaDeletada) {
            return res.json(turmaDeletada).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }

    async insereAluno(req: Request, res: Response) {
        const {codigo} = req.params;
        const alunoInserido: TurmaAluno | null = await model.insereAluno({codigoTurma: codigo, ...req.body});
        if (alunoInserido) {
            return res.json(alunoInserido).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
}