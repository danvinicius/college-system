import supertest from 'supertest';
import App from '../../src/App';

const req = supertest(App);
const baseRoute = '/turma';

describe('GET /turma', ()=> {

    it('SUCCESS: Should return all turmas', async () => {
        return req.get(baseRoute).then(res => expect(res.statusCode).toEqual(200));
    });

    it('FAIL: Should return 400 for a id that doesnt exist', async ()=> {
        return req.get(`${baseRoute}/CAP001`).then(res => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toBe('Bad request');
        });
    });

});

describe('POST /turma and DELETE /turma', ()=> {

    it('SUCCESS: Should insert student in database successfully', async () => {
        const validTurmaData = {
            codigo: 'INF999',
            professor: 'Nicolas Cage',
            codigoDisciplina: 'IC160',
            sala: 505,
            horario: '0:0:00',
            codigoPeriodo: '2020.1'
        };
        return req.get(`${baseRoute}/${validTurmaData.codigo}`).then(async res => {
            if (res.statusCode === 200) {
                return req.delete(`${baseRoute}/${validTurmaData.codigo}`).then(async res => {
                    expect(res.body.codigoDisciplina).toEqual(validTurmaData.codigoDisciplina);
                    return req.post(baseRoute).send(validTurmaData).then(res => expect(res.body.codigoDisciplina).toEqual(validTurmaData.codigoDisciplina));
                });
            
            } else {
                return req.post(baseRoute).send(validTurmaData).then(res => expect(res.body.codigoDisciplina).toEqual(validTurmaData.codigoDisciplina));
            }
        });
    });

});

describe('PUT /turma', ()=> {
    it('SUCCESS: Should update turm successfully', async ()=> {
        const codigo = 'INF999';
        const validStudentData = {
            professor: 'Celso Portiolli',
            sala: 1109,
        };
        return req.get(`${baseRoute}/${codigo}`).then(async res => {
            if (res.statusCode === 200) {
                return req.put(`${baseRoute}/${codigo}`).send(validStudentData).then(res => expect(res.statusCode).toBe(200));
            }
        });
    });
});