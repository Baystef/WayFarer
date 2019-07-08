import { Router } from 'express';
import { Bookings } from '../controllers';
import Authorization from '../middleware/authorization';
import Validate from '../middleware/validate';

const router = Router();

const { bookTrip, getBookings } = Bookings;
const { validate, checkValidationResult } = Validate;
const { verifyUser } = Authorization;

router.post('/', verifyUser, validate('makeBooking'), checkValidationResult, bookTrip);

router.get('/', verifyUser, getBookings);

export default router;
