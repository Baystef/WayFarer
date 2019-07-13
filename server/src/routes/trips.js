import { Router } from 'express';
import { Trips } from '../controllers';
import Authorization from '../middleware/authorization';
import Validate from '../middleware/validate';

const router = Router();

const { createTrip, getAllTrips, cancelTrip } = Trips;
const { validate, checkValidationResult } = Validate;
const { verifyAdmin, verifyUser } = Authorization;

// Create a trip
router.post('/', verifyAdmin, validate('createTrip'), checkValidationResult, createTrip);

// Get all trips
router.get('/', verifyUser, validate('getTrip'), checkValidationResult, getAllTrips);

// Cancel a trip
router.patch('/:trip_id', verifyAdmin, validate('cancelTrip'), checkValidationResult, cancelTrip);

export default router;
