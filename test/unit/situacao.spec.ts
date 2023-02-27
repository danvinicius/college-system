import AlunoModel from '../../src/models/Aluno';
const model = new AlunoModel();

it('should return the total IRA of the student', async () => {

    model.consultaNotasDeTodosOsPeriodos = jest.fn().mockResolvedValue([
        {
            nota: 8,
            resultado: 'AP',
            turma: {
                codigo: 'INF001',
                disciplina: {
                    cargaHoraria: 30,
                },
            },
        },
        {
            nota: 4,
            resultado: 'RM',
            turma: {
                codigo: 'INF002',
                disciplina: {
                    cargaHoraria: 30,
                },
            },
        },
    ]);
    const calculoIRATotal = await model.calculoIRATotal('foo');

    expect(model.consultaNotasDeTodosOsPeriodos).toHaveBeenCalledTimes(1);

    expect(calculoIRATotal.mediaPonderada).toBe(6);

    expect(calculoIRATotal.resultados[0].resultado).toEqual('AP');
    expect(calculoIRATotal.resultados[1].resultado).toEqual('RM');
});