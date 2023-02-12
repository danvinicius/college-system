import { Router } from 'express';
import Disciplina from '../controllers/disciplina';

const router = Router();
const controller = new Disciplina();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;