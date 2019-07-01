import { check } from 'express-validator';

export default [
  check('number_plate').not().isEmpty()
    .withMessage('Number plate is required')
    .isAlphanumeric()
    .withMessage('Number plate is invalid'),

  check('manufacturer').not().isEmpty()
    .withMessage('Manufacturer is required')
    .isLength({ min: 2, max: 25 })
    .withMessage('Manufacturer should be between 3 and 25 characters'),

  check('model').not().isEmpty()
    .withMessage('Model is required'),

  check('capacity').not().isEmpty()
    .withMessage('Capacity is required')
    .trim()
    .isNumeric()
    .withMessage('Capacity must be an integer')
    .isInt({ min: 7, max: 150 })
    .withMessage('Minimum capacity is 7 and Maximum is 150'),
];
