import { Router } from 'express';
import DisciplinaController from '../controllers/disciplina';

const router = Router();
const controller = new DisciplinaController();

router.get('/', controller.getAll);
router.get('/:codigo', controller.getById);
router.post('/', controller.create);
router.put('/:codigo', controller.update);
router.delete('/:codigo', controller.delete);

export default router;