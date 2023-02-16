import { Request, Response } from 'express';
import AlunoModel from '../models/Aluno';
import { Aluno } from '@prisma/client';

const model = new AlunoModel();

export default class AlunoController {
    async getAll(req: Request, res: Response) {
        const alunos: Aluno[] | null = await model.getAll();
        if (alunos) {
            return res.json(alunos).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
        
    }

    async getByMatricula(req: Request, res: Response) {
        const {matricula} = req.params;
        const aluno: Aluno | null = await model.getById(matricula);
        if (aluno) {
            return res.json(aluno).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async create(req: Request, res: Response) {
        const aluno: Aluno = req.body;
        const alunoCriado: Aluno | null = await model.create(aluno);
        if (alunoCriado) {
            return res.json(alunoCriado).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async update(req: Request, res: Response) {
        const {matricula} = req.params;
        const aluno: Aluno = req.body;
        const alunoAtualizado: Aluno | null = await model.update(matricula, aluno);
        if (alunoAtualizado) {
            return res.json(alunoAtualizado).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async delete(req: Request, res: Response) {
        const {matricula} = req.params;
        const alunoDeletado: Aluno | null = await model.delete(matricula);
        if (alunoDeletado) {
            return res.json(alunoDeletado).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }

    async calculoIRADeUmPeriodo(req: Request, res: Response) {
        const {matricula, periodo} = req.params;
        const iraPeriodo = await model.calculoIRADeUmPeriodo(matricula, periodo);
        if (iraPeriodo) {
            return res.json({media: iraPeriodo}).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async calculoIRATotal(req: Request, res: Response) {
        const {matricula} = req.params;
        const iraPeriodo = await model.calculoIRATotal(matricula);
        if (iraPeriodo) {
            return res.json({media: iraPeriodo}).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
}