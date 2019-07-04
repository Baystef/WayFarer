import { Model } from '../models';
import {
  conflictResponse, internalErrREesponse, successResponse, nullResponse,
} from '../utils/response';
import { log } from '../utils';


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

  static async getAllTrips(req, res) {
    try {
      const { origin, destination } = req.query;
      switch (false) {
        case !origin: {
          const data = await Trips.tripModel().select('*', `WHERE origin='${origin}'`);
          if (!data[0]) return nullResponse(res, 'No trip available from this location');
          return successResponse(res, 200, data);
        }

        case !destination: {
          const data = await Trips.tripModel().select('*', `WHERE destination='${destination}'`);
          if (!data[0]) return nullResponse(res, 'No trips available to this destination');
          return successResponse(res, 200, data);
        }

        default: {
          const data = await Trips.tripModel().select('*');
          if (!data[0]) return nullResponse(res, 'No trips available');
          return successResponse(res, 200, data);
        }
      }
    } catch (error) {
      return internalErrREesponse(res);
    }
  }

  static async cancelTrip(req, res) {
    const trip_id = Number(req.params.trip_id);
    const clause = `WHERE id=${trip_id}
    RETURNING *`;
    try {
      const data = await Trips.tripModel().select('*', `WHERE id=${trip_id}`);
      if (!data[0]) {
        return nullResponse(res, 'Trip does not exist');
      }
      if (data[0].status === 'cancelled') {
        return conflictResponse(res, 'Trip is already cancelled');
      }
      await Trips.tripModel().update('status=\'cancelled\'', clause);
      return successResponse(res, 200, { message: 'Trip cancelled successfully' });
    } catch (error) {
      return internalErrREesponse(res);
    }
  }
}

export default Trips;
