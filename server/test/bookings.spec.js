import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

let request;
beforeEach(() => {
  request = chai.request(server);
});

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
