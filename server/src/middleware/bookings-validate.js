import { check, param } from 'express-validator';

/**
 * @description Checks all fields of the bookings request bodyand parameter
 */
const makeBookingValidate = [
  check('trip_id').not().isEmpty()
    .withMessage('Trip ID is required')
    .isInt({ min: 1 })
    .withMessage('Trip ID is invalid'),

  check('seat_number').optional()
    .isInt({ min: 1 })
    .withMessage('Seat number is invalid'),
];

const deleteBookingValidate = [
  param('booking_id').not().isEmpty()
    .withMessage('Booking ID parameter is required')
    .isInt({ min: 1 })
    .withMessage('Booking ID is invalid'),
];

const changeSeatValidate = [
  check('seat_number').not().isEmpty()
    .withMessage('Seat number is required')
    .isInt({ min: 1 })
    .withMessage('Seat number is invalid'),
  ...deleteBookingValidate,
];

export { makeBookingValidate, deleteBookingValidate, changeSeatValidate };
