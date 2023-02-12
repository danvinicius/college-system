import { Router } from 'express';
import Periodo from '../controllers/periodo';

const router = Router();
const controller = new Periodo();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;