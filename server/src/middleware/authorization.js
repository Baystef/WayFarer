import { Auth } from '../utils';
import {
  unauthorizedResponse, forbiddenResponse,
} from '../utils/response';

const { verifyToken } = Auth;

/**
 * @description User Authorization
 * @exports Authorization
 */
class Authorization {
  /**
   * @description Verifies if user is admin and has a valid token
   * to access admin resources
   * @param {object} req request object
   * @param {object} res response object
   * @returns {boolean} returns true or false for admin verification
   */
  static verifyAdmin(req, res, next) {
    try {
      const token = req.get('Authorization').replace('Bearer ', '') || req.headers.token || req.body.token;
      const decoded = verifyToken(token);
      const { is_admin } = decoded;
      if (!is_admin) {
        return forbiddenResponse(res, 'Access Denied');
      }
      return next();
    } catch (error) {
      return unauthorizedResponse(res, 'Invalid token or none provided');
    }
  }

  /**
   * @description Verifies if user is signed in and has a valid token
   * to access user resources
   * @param {object} req request object
   * @param {object} res response object
   * @returns {boolean} returns true or false for user verification
   */
  static verifyUser(req, res, next) {
    try {
      const token = req.get('Authorization').replace('Bearer ', '') || req.headers.token || req.body.token;
      const decoded = verifyToken(token);
      req.user = decoded;
      if (!req.user.id) {
        return forbiddenResponse(res, 'Access Denied');
      }
      return next();
    } catch (error) {
      return unauthorizedResponse(res, 'Invalid token or none provided');
    }
  }
}

export default Authorization;
