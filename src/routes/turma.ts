import { Router } from 'express';
import TurmaController from '../controllers/turma';

const router = Router();
const controller = new TurmaController();

router.get('/', controller.getAll);
router.get('/:codigo', controller.getById);
router.post('/', controller.create);
router.put('/:codigo', controller.update);
router.delete('/:codigo', controller.delete);

export default router;