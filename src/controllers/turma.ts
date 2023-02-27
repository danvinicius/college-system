import { Request, Response } from 'express';
import TurmaModel from '../models/Turma';
import { Turma, TurmaAluno } from '@prisma/client';

const model = new TurmaModel();

export default class TurmaController {
    async getAll(req: Request, res: Response) {
        const turmas: Turma[] | null = await model.getAll();
        if (turmas) {
            return res.status(200).json(turmas);
        }
        return res.status(400).json({ err: 'Bad request' });

    }

    async getById(req: Request, res: Response) {
        const { codigo } = req.params;
        const turma: Turma | null = await model.getById(codigo);
        if (turma) {
            return res.status(200).json(turma);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async create(req: Request, res: Response) {
        const turma: Turma = req.body;
        const turmaCriada: Turma | null = await model.create(turma);
        if (turmaCriada) {
            return res.status(200).json(turmaCriada);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async update(req: Request, res: Response) {
        const { codigo } = req.params;
        const turma: Turma = req.body;
        const turmaAtualizada: Turma | null = await model.update(codigo, turma);
        if (turmaAtualizada) {
            return res.status(200).json(turmaAtualizada);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async delete(req: Request, res: Response) {
        const { codigo } = req.params;
        const turmaDeletada: Turma | null = await model.delete(codigo);
        if (turmaDeletada) {
            return res.status(200).json(turmaDeletada);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async insereAluno(req: Request, res: Response) {
        const { codigo } = req.params;
        const alunoInserido: TurmaAluno | null = await model.insereAluno({ codigoTurma: codigo, ...req.body });
        if (alunoInserido) {
            return res.status(200).json(alunoInserido);
        }
        return res.status(400).json({ err: 'Bad request' });
    }
}