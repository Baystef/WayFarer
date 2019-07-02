import { Router } from 'express';
import { Trips } from '../controllers';
import Authorization from '../middleware/authorization';
import Validate from '../middleware/validate';

const router = Router();

const { createTrip, getAllTrips } = Trips;
const { validate, checkValidationResult } = Validate;
const { verifyAdmin, verifyUser } = Authorization;

router.post('/', verifyAdmin, validate('createTrip'), checkValidationResult, createTrip);

router.get('/', verifyUser, getAllTrips);

export default router;
