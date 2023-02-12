import BasicCrudOperations from '../utils/interfaces/BacisCrudOperations';
import { Request, Response } from 'express';

export default class Aluno implements BasicCrudOperations {
    async getAll(req: Request, res: Response) {
        // chama model pra buscar todos os alunos
        res.send({message: 'Olá mundo'}).status(200);
        
    }

    async getById(req: Request, res: Response) {
        const id = req.params;
        // chama model pra buscar um aluno pelo id
    }
    
    async create(req: Request, res: Response) {
        // chama model pra cadastrar um novo aluno
    }
    
    async update(req: Request, res: Response) {
        const id = req.params;
        // chama model pra atualizar um aluno pelo id
    }
    
    async delete(req: Request, res: Response) {
        const id = req.params;
        // chama model pra deletar um aluno pelo id
    }
}