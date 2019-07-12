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

  check('year').not().isEmpty()
    .withMessage('Year is required')
    .trim()
    .isNumeric()
    .withMessage('Capacity must be an integer')
    .isInt({ min: 2005, max: 2020 })
    .withMessage('Year of manufacture must be between 2005 and 2020'),

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
