import { Router } from 'express';
import Aluno from '../controllers/aluno';

const router = Router();
const controller = new Aluno();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;