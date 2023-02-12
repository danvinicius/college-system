import { Router } from 'express';
import Turma from '../controllers/turma';

const router = Router();
const controller = new Turma();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;