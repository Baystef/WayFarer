import { Model } from '../models';
import { Auth } from '../utils';
import {
  conflictResponse, internalErrREesponse, unauthorizedResponse, successResponse,
} from '../utils/response';


class Users {
  static Model() {
    return new Model('users');
  }

  /**
  * @description Creates new user account
  * @param {object} req request object
  * @param {object} res response object
  * @returns {object}  JSON response
  */
  static async signUp(req, res) {
    const {
      first_name, last_name, email, password,
    } = req.body;
    const hashedPassword = Auth.hash(password);
    const columns = 'first_name, last_name, email, password';
    const values = `'${first_name}', '${last_name}', '${email}', '${hashedPassword}'`;
    const clause = 'RETURNING id, first_name, last_name, email, is_admin';

    try {
      const data = await Users.Model().insert(columns, values, clause);
      const { id, isAdmin } = data[0];
      const token = Auth.generateToken({ id, email, isAdmin });
      return successResponse(res, 201, { token, ...data[0] });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return conflictResponse(res, 'User already exists');
      }
      return internalErrREesponse(res);
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const columns = 'id, email, password, is_admin';
    const clause = `WHERE email='${email}'`;
    try {
      const data = await Users.Model().select(columns, clause);
      if (!data[0]) return unauthorizedResponse(res, 'Invalid Credentials');
      if (!Auth.compare(password, data[0].password)) {
        return unauthorizedResponse(res, 'Invalid Credentials');
      }
      const { id, is_admin } = data[0];
      const output = { id, email, is_admin };
      const token = Auth.generateToken({ ...output });
      return successResponse(res, 200, { token, ...output });
    } catch (error) {
      return internalErrREesponse(res);
    }
  }
}

export default Users;
