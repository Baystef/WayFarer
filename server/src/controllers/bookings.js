import { Model } from '../models';
import getFreeSeats from '../helper';
import {
  conflictResponse, internalErrREesponse, successResponse, nullResponse,
} from '../utils/response';

class Bookings {
  static bookModel() {
    return new Model('bookings');
  }

  static tripModel() {
    return new Model('trips');
  }

  static userModel() {
    return new Model('users');
  }

  static busModel() {
    return new Model('buses');
  }

  static async bookTrip(req, res) {
    let { trip_id, seat_number } = req.body;
    const { id, email } = req.user;
    trip_id = Number(trip_id);
    seat_number = Number(seat_number);
    const tripColumns = 'id, bus_id, trip_date';
    const bookClause = `WHERE trip_id=${trip_id}`;
    const seatClause = `WHERE trip_id=${trip_id} AND seat_number=${seat_number}`;
    const mbColumns = 'trip_id, user_id, seat_number';
    const mbValues = `${trip_id}, ${id}, ${seat_number}`;
    const mbClause = 'RETURNING id, trip_id, user_id, seat_number';
    const userColumn = 'first_name, last_name';

    try {
      // Check if the trip exists
      const trip = await Bookings.tripModel().select(tripColumns, `WHERE id=${trip_id}`);
      if (!trip[0]) {
        return nullResponse(res, 'Trip is unavailable');
      }
      const { bus_id, trip_date } = trip[0];
      // Check if seat has been booked by the current user with same seat_number and trip_id
      const bookExists = await Bookings.bookModel().select('*', bookClause);
      const booked = bookExists.find(el => el.user_id === id);
      if (booked) {
        return conflictResponse(res, 'You have a current booking for this trip');
      }
      // Check if seat has been booked by someone else
      const seatExists = await Bookings.bookModel().select('*', seatClause);
      if (!booked && seatExists[0]) {
        // Get all already booked seats
        const occupiedSeats = bookExists.map(book => book.seat_number);
        // Get the capacity of the bus been used for the trip
        const busCap = await Bookings.busModel().select('capacity', `WHERE id=${bus_id}`);
        const { capacity } = busCap[0];
        // Get the number of free seats left on a bus for a particular trip
        const availableSeats = getFreeSeats(occupiedSeats, capacity);
        if (availableSeats.length === 0) {
          return nullResponse(res, 'All seats on this bus have been occupied');
        }
        return conflictResponse(res, `Seat is already occupied. Available seat(s): (${availableSeats.join(', ')})`);
      }
      // Get frist_name and last_name from users table
      const user = await Bookings.userModel().select(userColumn, `WHERE id=${id}`);
      const { first_name, last_name } = user[0];
      const booking = await Bookings.bookModel().insert(mbColumns, mbValues, mbClause);
      const data = {
        booking_id: booking[0].id,
        user_id: id,
        trip_id,
        bus_id,
        trip_date,
        seat_number,
        first_name,
        last_name,
        email,
      };
      return successResponse(res, 200, data);
    } catch (error) {
      return internalErrREesponse(res);
    }
  }

  static async getBookings(req, res) {
    const { id, is_admin } = req.user;
    const columns = `b.id AS booking_id, trip_id, user_id, seat_number, 
    bus_id, trip_date, first_name, last_name, email`;
    const clause = `b
    join trips t ON t.id = trip_id
    join users u ON u.id = user_id`;

    try {
      if (!is_admin) {
        const data = await Bookings.bookModel().select(columns, `${clause} WHERE user_id=${id}`);
        if (!data[0]) {
          return nullResponse(res, 'You have no active bookings');
        }
        return successResponse(res, 200, data);
      }
      const data = await Bookings.bookModel().select(columns, clause);
      return successResponse(res, 200, data);
    } catch (error) {
      return internalErrREesponse(res);
    }
  }

  static async deleteBooking(req, res) {
    const { bookingId } = req.params;
    const { id } = req.user;
    const clause = `WHERE id=${bookingId} AND user_id=${id}`;
    try {
      const data = await Bookings.bookModel().select('*', clause);
      if (data[0]) {
        await Bookings.bookModel().delete(clause);
        return successResponse(res, 200, { message: 'Booking deleted successfully' });
      }
      return nullResponse(res, 'You have no active booking with that ID');
    } catch (error) {
      return internalErrREesponse(res);
    }
  }
}

export default Bookings;
