import express, { Express } from 'express';
import alunoRouter from './routes/aluno';

export default class Server {
    constructor(private app: Express, private port: number) {}

    config() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use('/aluno', alunoRouter);
    }

    run() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        })
    }
}