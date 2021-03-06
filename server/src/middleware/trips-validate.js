import { check, param, query } from 'express-validator';

/**
 * @description Checks all fields of the trips request body, parameter and query
 */
const createTripValidate = [
  check('bus_id').not().isEmpty()
    .withMessage('Bus ID is required')
    .isNumeric()
    .withMessage('Bus ID must be an integer')
    .isInt({ min: 1 })
    .withMessage('Invalid Bus ID'),

  check('origin').not().isEmpty()
    .withMessage('Origin is required')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Origin should be between 2 to 50 characters'),

  check('destination').not().isEmpty()
    .withMessage('Destination is required')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Destination should be between 2 to 50 characters'),

  check('trip_date').not().isEmpty()
    .withMessage('Trip date is required')
    .isISO8601()
    .withMessage('Invalid date format. Use format YYYY-MM-DD'),

  check('fare').not().isEmpty()
    .withMessage('Fare is required')
    .isNumeric()
    .withMessage('Fare must be an integer')
    .isInt({ min: 50, max: 10000 })
    .withMessage('Fare should be between (\u20A6)50 and (\u20A6)10,000'),
];

const cancelTripValidate = [
  param('trip_id').isInt({ min: 1 })
    .withMessage('Invalid trip ID'),
];

const getTripValidate = [
  query('origin').optional().matches(/^[\w',-\\/.\s]*$/)
    .withMessage('Origin must be alphabets')
    .isLength({ min: 3, max: 25 })
    .withMessage('Origin should be between 3 and 25 characters'),

  query('destination').optional().matches(/^[\w',-\\/.\s]*$/)
    .withMessage('Destination must be alphabets')
    .isLength({ min: 3, max: 25 })
    .withMessage('Destination should be between 3 and 25 characters'),
];

export { createTripValidate, cancelTripValidate, getTripValidate };
