import { check } from 'express-validator';

export default [
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

  check('fare').not().isEmpty()
    .withMessage('Fare is required')
    .isNumeric()
    .withMessage('Fare must be an integer')
    .isInt({ min: 50, max: 10000 })
    .withMessage('Fare should be between (\u20A6)50 and (\u20A6)10,000'),
];
