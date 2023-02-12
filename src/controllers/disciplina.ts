import BasicCrudOperations from '../utils/interfaces/BacisCrudOperations';
import { Request, Response } from 'express';

export default class Disciplina implements BasicCrudOperations {
    async getAll(req: Request, res: Response) {
        // chama model pra buscar todas os disciplinas
    }

    async getById(req: Request, res: Response) {
        const id = req.params;
        // chama model pra buscar uma disciplina pelo id
    }
    
    async create(req: Request, res: Response) {
        // chama model pra cadastrar uma nova disciplina
    }
    
    async update(req: Request, res: Response) {
        const id = req.params;
        // chama model pra atualizar uma disciplina pelo id
    }
    
    async delete(req: Request, res: Response) {
        const id = req.params;
        // chama model pra deletar uma disciplina pelo id
    }
}