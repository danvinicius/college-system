import { Router } from 'express';
import PeriodoController from '../controllers/periodo';

const router = Router();
const controller = new PeriodoController();

router.get('/', controller.getAll);
router.get('/:codigo', controller.getById);
router.post('/', controller.create);
router.put('/:codigo', controller.update);
router.delete('/:codigo', controller.delete);

export default router;