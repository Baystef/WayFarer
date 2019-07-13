import { Router } from 'express';
import { Buses } from '../controllers';
import Authorization from '../middleware/authorization';
import Validate from '../middleware/validate';

const router = Router();

const { addBus } = Buses;
const { validate, checkValidationResult } = Validate;
const { verifyAdmin } = Authorization;

// Add new bus
router.post('/', verifyAdmin, validate('addBus'), checkValidationResult, addBus);

export default router;
