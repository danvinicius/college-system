import { Router } from 'express';
import TurmaController from '../controllers/turma';

const router = Router();
const controller = new TurmaController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;