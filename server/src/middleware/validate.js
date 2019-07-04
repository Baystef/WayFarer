import { check, validationResult } from 'express-validator';
import { badRequestResponse } from '../utils/response';
import signinValidate from './auth-validate';
import busesValidate from './buses-validate';
import { createTripValidate, cancelTripValidate, getTripValidate } from './trips-validate';


class Validate {
  /**
   * @description Validates all fields request body
   * @param {string} route Route to be validated
   */
  static validate(route) {
    switch (route) {
      case 'signup':
        return [
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

      case 'signin':
        return signinValidate;

      case 'addBus':
        return busesValidate;

      case 'createTrip':
        return createTripValidate;

      case 'getTrip':
        return getTripValidate;

      case 'cancelTrip':
        return cancelTripValidate;

      default:
        return [];
    }
  }

  /**
 * @description Resolves validation middleware
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next move to next middleware
 */
  static checkValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return badRequestResponse(res, errors.array()[0].msg);
  }
}

export default Validate;
