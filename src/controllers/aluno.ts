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

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        const aluno: Aluno | null = await model.getById(Number(id));
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
        const {id} = req.params;
        const aluno: Aluno = req.body;
        const alunoAtualizado: Aluno | null = await model.update(Number(id), aluno);
        if (alunoAtualizado) {
            return res.json(alunoAtualizado).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
    
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        const alunoDeletado: Aluno | null = await model.delete(Number(id));
        if (alunoDeletado) {
            return res.json(alunoDeletado).status(200);
        }
        return res.json({err: 'Bad request'}).status(400);
    }
}