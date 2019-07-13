import { validationResult } from 'express-validator';
import { badRequestResponse } from '../utils/response';
import { signupValidate, signinValidate } from './auth-validate';
import busesValidate from './buses-validate';
import { createTripValidate, cancelTripValidate, getTripValidate } from './trips-validate';
import { makeBookingValidate, deleteBookingValidate, changeSeatValidate } from './bookings-validate';


class Validate {
  /**
   * @description Validates all fields request body
   * @param {string} route Route to be validated
   */
  static validate(route) {
    switch (route) {
      case 'signup':
        return signupValidate;

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

      case 'makeBooking':
        return makeBookingValidate;

      case 'deleteBooking':
        return deleteBookingValidate;

      case 'changeSeat':
        return changeSeatValidate;

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
