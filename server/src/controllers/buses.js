import { Model } from '../models';
import {
  conflictResponse, internalErrREesponse, successResponse,
} from '../utils/response';

/**
 * @description houses the method for the bus endpoint
 */
class Buses {
  /**
   * @description Creates the buses Model instance
   */
  static Model() {
    return new Model('buses');
  }

  /**
   * @description Add new bus
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} JSON response
   */
  static async addBus(req, res) {
    const {
      number_plate, manufacturer, year, model, capacity,
    } = req.body;
    const columns = 'number_plate, manufacturer, year, model, capacity';
    const values = `'${number_plate}', '${manufacturer}', ${year}, '${model}', ${capacity}`;
    const clause = 'RETURNING *';
    try {
      const data = await Buses.Model().insert(columns, values, clause);
      return successResponse(res, 201, { ...data[0] });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return conflictResponse(res, 'Bus already exists');
      }
      return internalErrREesponse(res);
    }
  }
}

export default Buses;
