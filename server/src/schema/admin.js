import { Model } from '../models';
import { Auth, log } from '../utils';

class Admin {
  static Model() {
    return new Model('users');
  }

  static async seedAdmin() {
    const hashedPassword = Auth.hash('wayfarer10');
    const columns = 'first_name, last_name, email, password, is_admin';
    const values = `'Admin', 'WayFarer', 'admin@wayfarer.com', '${hashedPassword}', true`;
    const clause = 'RETURNING id, first_name, last_name, email, is_admin';

    try {
      await Admin.Model().insert(columns, values, clause);
    } catch (error) {
      log(error.messsage);
    }
  }
}

export default Admin;
