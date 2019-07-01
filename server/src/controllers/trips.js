import { Model } from '../models';
import {
  conflictResponse, internalErrREesponse, successResponse, nullResponse,
} from '../utils/response';

class Trips {
  static tripModel() {
    return new Model('trips');
  }

  static busModel() {
    return new Model('buses');
  }

  static async createTrip(req, res) {
    const {
      bus_id, origin, destination, fare,
    } = req.body;
    const tripColumns = 'bus_id, origin, destination, status';
    const tripClause = `WHERE bus_id=${bus_id}`;
    const columns = 'bus_id, origin, destination, fare';
    const values = `${bus_id}, '${origin}', '${destination}', ${fare}`;
    const clause = 'RETURNING *';

    try {
      const busAvail = await Trips.busModel().select('*', `WHERE id=${bus_id}`);
      if (!busAvail[0]) return nullResponse(res, 'Bus is unavailable');
      const tripExist = await Trips.tripModel().select(tripColumns, tripClause);
      if (tripExist[0] && tripExist[0].status === 'active') {
        return conflictResponse(res, 'This trip is already created');
      }
      const makeTrip = await Trips.tripModel().insert(columns, values, clause);
      return successResponse(res, 200, { ...makeTrip[0] });
    } catch (error) {
      return internalErrREesponse(res);
    }
  }
}

export default Trips;
