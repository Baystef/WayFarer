import { check } from 'express-validator';

export default [
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Invalid Email Address')
    .customSanitizer(email => email.toLowerCase()),

  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
];
