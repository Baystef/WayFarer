import { check } from 'express-validator';

/**
 * @description Checks all fields of the auth request body
 */
const signupValidate = [
  check('first_name')
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .trim()
    .isLength({ min: 3, max: 25 })
    .withMessage('First name should be between 3 to 25 characters')
    .isAlpha()
    .withMessage('First name should contain alphabets only'),

  check('last_name')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .trim()
    .isLength({ min: 3, max: 25 })
    .withMessage('Last name should be between 3 to 25 characters')
    .isAlpha()
    .withMessage('Last name should contain alphabets only'),

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
    .withMessage('Password is required')
    .not()
    .isIn(['password', 'PASSWORD', 12345678, 87654321])
    .withMessage('Password is too simple')
    .trim()
    .isLength({ min: 8, max: 100 })
    .withMessage('Password must be atleast 8 to 100 characters')
    .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,100}$/)
    .withMessage('Password must contain letters and atleast 1 number'),
];

const signinValidate = [
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

export { signupValidate, signinValidate };
