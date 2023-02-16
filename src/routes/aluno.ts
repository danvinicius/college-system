import { Router } from 'express';
import AlunoController from '../controllers/aluno';

const router = Router();
const controller = new AlunoController();

router.get('/', controller.getAll);
router.get('/:matricula', controller.getByMatricula);
router.post('/', controller.create);
router.put('/:matricula', controller.update);
router.delete('/:matricula', controller.delete);
router.get('/ira/:matricula/:periodo', controller.calculoIRADeUmPeriodo);
router.get('/ira/:matricula', controller.calculoIRATotal);

export default router;