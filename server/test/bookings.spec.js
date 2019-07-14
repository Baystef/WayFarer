import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

let request;
beforeEach(() => {
  request = chai.request(server);
});

const admin = {
  email: 'admin@wayfarer.com',
  password: 'wayfarer10',
};

const user1 = {
  email: 'john@yahoo.com',
  password: 'whykilmydog12',
};

const user2 = {
  email: 'wick@gmail.com',
  password: 'whykilmydog12',
};

let user1token;
let user2token;
let adminToken;

describe('POST /bookings', () => {
  before((done) => {
    chai.request(server).post('/api/v1/auth/signin').send(user1)
      .end((err, res) => {
        user1token = res.body.data.token;
        done();
      });
  });

  it('should book a trip successfully', (done) => {
    const booking = {
      trip_id: 1,
      seat_number: 1,
    };
    request.post('/api/v1/bookings').send(booking)
      .set('Authorization', `Bearer ${user1token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.seat_number).to.exist;
        done();
      });
  });

  it('should throw error if user has a current booking on same trip', (done) => {
    const booking = {
      trip_id: 1,
      seat_number: 1,
    };
    request.post('/api/v1/bookings').send(booking)
      .set('Authorization', `Bearer ${user1token}`)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should throw error if seat has been booked by another user', (done) => {
    const booking = {
      trip_id: 1,
      seat_number: 1,
    };
    chai.request(server).post('/api/v1/auth/signin').send(user2)
      .end((loginerr, loginres) => {
        user2token = loginres.body.data.token;
        request.post('/api/v1/bookings').send(booking)
          .set('Authorization', `Bearer ${user2token}`)
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal('error');
            expect(res.body.error).to.exist;
            done();
          });
      });
  });
});

describe('GET /bookings', () => {
  before((done) => {
    chai.request(server).post('/api/v1/auth/signin').send(admin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done();
      });
  });

  it('should return all bookings successfully', () => {
    request.get('/api/v1/bookings').set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.status).to.equal('success');
      });
  });

  it('should return all bookings for a particular user', () => {
    request.get('/api/v1/bookings').set('Authorization', `Bearer ${user1token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.status).to.equal('success');
      });
  });
});

describe('PATCH /bookings/:booking_id', () => {
  it('should update a seat number successfully', (done) => {
    const seat = {
      seat_number: 2,
    };
    request.patch('/api/v1/bookings/1').send(seat)
      .set('Authorization', `Bearer ${user1token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.message).to.equal('Seat number updated successfully');
        done();
      });
  });

  it('should throw an error if booking does not exist', (done) => {
    const seat = {
      seat_number: 3,
    };
    request.patch('/api/v1/bookings/3').send(seat)
      .set('Authorization', `Bearer ${user1token}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('You have no active booking with that ID');
        done();
      });
  });
});

describe('DELETE /bookings/:booking_id', () => {
  it('should delete a booking successfully', (done) => {
    request.delete('/api/v1/bookings/1').set('Authorization', `Bearer ${user1token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.message).to.equal('Booking deleted successfully');
        done();
      });
  });

  it('should throw an error if booking ID is not an integer', (done) => {
    request.delete('/api/v1/bookings/a').set('Authorization', `Bearer ${user1token}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Booking ID is invalid');
        done();
      });
  });
});
