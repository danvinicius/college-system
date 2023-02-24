import supertest from 'supertest';
import App from '../../src/App';

const req = supertest(App);
const baseRoute = '/aluno';

describe('GET /aluno', ()=> {

    it('SUCCESS: Should return all students', async () => {
        return req.get(baseRoute).then(res => expect(res.statusCode).toEqual(200));
    });

    it('FAIL: Should return 400 for a registration that doesnt exist', async ()=> {
        return req.get(`${baseRoute}/000000`).then(res => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toBe('Bad request');
        });
    });

});

describe('POST /aluno and DELETE /aluno', ()=> {

    it('FAIL: Should return 400 for a student with less than 16 y.o', async ()=> {
        const invalidBirthdayData = {
            nome: 'Daniel Vinicius',
            dataDeNasc: new Date('2012-04-02'),
            dataDeMatricula: new Date('2023-03-02'),
            matricula: '20230013823',
            email: 'viniccius774@gmail.com',
    
        };
        return req.post(baseRoute).send(invalidBirthdayData).then(res => expect(res.body.err).toBe('Bad request'));
    });

    it('FAIL: Should return 400 for a student with registration different from registration date', async ()=> {
        const invalidMatriculaData = {
            nome: 'Daniel Vinicius',
            dataDeNasc: new Date('2001-04-02'),
            dataDeMatricula: new Date('2023-03-02'),
            matricula: '20210015800',
            email: 'danielvinicius@ufrrj.br',
    
        };
        return req.post(baseRoute).send(invalidMatriculaData).then(res => expect(res.body.err).toBe('Bad request'));
    });

    it('SUCCESS: Should insert student in database successfully', async () => {
        const validStudentData = {
            nome: 'Cassia Mariane',
            dataDeNasc: new Date('2001-04-02'),
            dataDeMatricula: new Date('2021-03-02'),
            matricula: '20210015800',
            email: 'cassiamariane01@gmail.com',
        };
        return req.get(`${baseRoute}/${validStudentData.matricula}`).then(async res => {
            if (res.statusCode === 200) {
                return req.delete(`${baseRoute}/${validStudentData.matricula}`).then(async res => {
                    expect(res.body.email).toEqual(validStudentData.email);

                    return req.post(baseRoute).send(validStudentData).then(res => expect(res.body.email).toEqual(validStudentData.email));
                });
            
            } else {
                return req.post(baseRoute).send(validStudentData).then(res => expect(res.body.email).toEqual(validStudentData.email));
            }
        });
    });

});

describe('PUT /aluno', ()=> {
    it('FAIL: Should not update aluno with invalid registration and registration date', async ()=> {
        const oldMatricula = '20210015800';
        const invalidStudentData = {
            dataDeMatricula: new Date('2022-03-02'),
            matricula: '20190015800',
        };
        return req.get(`${baseRoute}/${oldMatricula}`).then(async res => {
            if (res.statusCode === 200) {
                return req.put(`${baseRoute}/${oldMatricula}`).send(invalidStudentData).then(res => expect(res.statusCode).toBe(400));
            }
        });
    });
});