import { Router } from 'express';
import DisciplinaController from '../controllers/disciplina';

const router = Router();
const controller = new DisciplinaController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;