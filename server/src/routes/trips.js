import { Router } from 'express';
import { Trips } from '../controllers';
import Authorization from '../middleware/authorization';
import Validate from '../middleware/validate';

const router = Router();

const { createTrip } = Trips;
const { validate, checkValidationResult } = Validate;
const { verifyAdmin } = Authorization;

router.post('/', verifyAdmin, validate('createTrip'), checkValidationResult, createTrip);

export default router;
