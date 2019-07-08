import { check, param } from 'express-validator';

const makeBookingValidate = [
  check('trip_id').not().isEmpty()
    .withMessage('Trip ID is required')
    .isInt({ min: 1 })
    .withMessage('Trip ID is invalid'),

  check('seat_number').not().isEmpty()
    .withMessage('Seat number is required')
    .isInt({ min: 1 })
    .withMessage('Seat number is invalid'),
];

const deleteBookingValidate = [
  param('bookingId').not().isEmpty()
    .withMessage('Booking ID parameter is required')
    .isInt({ min: 1 })
    .withMessage('Booking ID is invalid'),
];

export { makeBookingValidate, deleteBookingValidate };
