import { Request, Response } from 'express';

export default interface BasicCrudOperations {
    getAll(req: Request, res: Response): any;

    getById(req: Request, res: Response): any;
    
    create(req: Request, res: Response): any;
    
    update(req: Request, res: Response): any;
    
    delete(req: Request, res: Response): any;
}