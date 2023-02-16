import express, { Express } from 'express';
import alunoRouter from './routes/aluno';
import turmaRouter from './routes/turma';
import disciplinaRouter from './routes/disciplina';
import periodoRouter from './routes/periodo';

export default class Server {
    constructor(private app: Express, private port: number) {}

    config() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use('/aluno', alunoRouter);
        this.app.use('/turma', turmaRouter);
        this.app.use('/disciplina', disciplinaRouter);
        this.app.use('/periodo', periodoRouter);
    }

    run() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}