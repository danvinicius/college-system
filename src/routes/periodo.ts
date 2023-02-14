import { Router } from 'express';
import PeriodoController from '../controllers/periodo';

const router = Router();
const controller = new PeriodoController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;