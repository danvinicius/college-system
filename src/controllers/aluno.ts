import { Request, Response } from 'express';
import AlunoModel from '../models/Aluno';
import { Aluno } from '@prisma/client';

const model = new AlunoModel();

export default class AlunoController {
    async getAll(req: Request, res: Response) {
        const alunos: Aluno[] | null = await model.getAll();
        if (alunos) {
            return res.status(200).json(alunos);
        }
        return res.status(400).json({ err: 'Bad request' });

    }

    async getByMatricula(req: Request, res: Response) {
        const { matricula } = req.params;
        const aluno: Aluno | null = await model.getById(matricula);
        if (aluno) {
            return res.status(200).json(aluno);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async create(req: Request, res: Response) {
        const aluno: Aluno = req.body;
        const alunoCriado: Aluno | null = await model.create(aluno);
        if (alunoCriado) {
            return res.status(200).json(alunoCriado);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async update(req: Request, res: Response) {
        const { matricula } = req.params;
        const aluno: Aluno = req.body;
        const alunoAtualizado: Aluno | null = await model.update(matricula, aluno);
        if (alunoAtualizado) {
            return res.status(200).json(alunoAtualizado);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async delete(req: Request, res: Response) {
        const { matricula } = req.params;
        const alunoDeletado: Aluno | null = await model.delete(matricula);
        if (alunoDeletado) {
            return res.status(200).json(alunoDeletado);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async calculoIRADeUmPeriodo(req: Request, res: Response) {
        const { matricula, periodo } = req.params;
        const iraPeriodo = await model.calculoIRADeUmPeriodo(matricula, periodo);
        if (iraPeriodo) {
            return res.status(200).json(iraPeriodo);
        }
        return res.status(400).json({ err: 'Bad request' });
    }

    async calculoIRATotal(req: Request, res: Response) {
        const { matricula } = req.params;
        const iraPeriodo = await model.calculoIRATotal(matricula);
        if (iraPeriodo) {
            return res.status(200).json(iraPeriodo);
        }
        return res.status(400).json({ err: 'Bad request' });
    }
}