import { Router } from 'express';
import { Bookings } from '../controllers';
import Authorization from '../middleware/authorization';
import Validate from '../middleware/validate';

const router = Router();

const { bookTrip } = Bookings;
const { validate, checkValidationResult } = Validate;
const { verifyUser } = Authorization;

router.post('/', verifyUser, validate('makeBooking'), checkValidationResult, bookTrip);

export default router;
