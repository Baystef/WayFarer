import { Router } from 'express';
import { Bookings } from '../controllers';
import Authorization from '../middleware/authorization';
import Validate from '../middleware/validate';

const router = Router();

const { bookTrip, getBookings, deleteBooking, changeSeat } = Bookings;
const { validate, checkValidationResult } = Validate;
const { verifyUser } = Authorization;

// Create new booking
router.post('/', verifyUser, validate('makeBooking'), checkValidationResult, bookTrip);

// Get all bookings
router.get('/', verifyUser, getBookings);

// Delete a booking
router.delete('/:booking_id', verifyUser, validate('deleteBooking'), checkValidationResult, deleteBooking);

// Change booked seat
router.patch('/:booking_id', verifyUser, validate('changeSeat'), checkValidationResult, changeSeat);

export default router;
