import { check } from 'express-validator';

export default [
  check('trip_id').not().isEmpty()
    .withMessage('Trip ID is required')
    .isInt({ min: 1 })
    .withMessage('Trip ID is invalid'),

  check('seat_number').not().isEmpty()
    .withMessage('Seat number is required')
    .isInt({ min: 1 })
    .withMessage('Seat number is invalid'),
];
