import chai from 'chai';
import chaiHttp from 'chai-http';
import { pool } from '../src/models';
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

let adminToken;

describe('POST /trips', () => {
  before((done) => {
    chai.request(server).post('/api/v1/auth/signin').send(admin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done();
      });
  });

  it('should create a new trip successfully', (done) => {
    const newTrip = {
      bus_id: 1,
      origin: 'Abule Egba',
      destination: 'Lekki',
      fare: 1000,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('should throw error if trip already exists', (done) => {
    const newTrip = {
      bus_id: 1,
      origin: 'Abule Egba',
      destination: 'Lekki',
      fare: 1000,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('This trip is already created');
        done();
      });
  });

  it('should throw error if bus ID is missing', (done) => {
    const newTrip = {
      origin: 'Abule Egba',
      destination: 'Lekki',
      fare: 1000,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Bus ID is required');
        done();
      });
  });

  it('should throw error if origin is missing', (done) => {
    const newTrip = {
      bus_id: 2,
      destination: 'Lekki',
      fare: 1000,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Origin is required');
        done();
      });
  });

  it('should throw error if destination is missing', (done) => {
    const newTrip = {
      bus_id: 3,
      origin: 'Abule Egba',
      fare: 1000,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Destination is required');
        done();
      });
  });

  it('should throw error if fare is missing', (done) => {
    const newTrip = {
      bus_id: 3,
      origin: 'Abule Egba',
      destination: 'Lekki',
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Fare is required');
        done();
      });
  });

  it('should throw error if bus ID is not an integer', (done) => {
    const newTrip = {
      bus_id: 'five',
      origin: 'Abule Egba',
      destination: 'Lekki',
      fare: 400,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Bus ID must be an integer');
        done();
      });
  });

  it('should throw error if origin is too short/long', (done) => {
    const newTrip = {
      bus_id: 6,
      origin: 'A',
      destination: 'Lekki',
      fare: 400,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Origin should be between 2 to 50 characters');
        done();
      });
  });

  it('should throw error if origin is too short/long', (done) => {
    const newTrip = {
      bus_id: 6,
      origin: 'Abule Egba',
      destination: 'L',
      fare: 400,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Destination should be between 2 to 50 characters');
        done();
      });
  });

  it('should throw error if fare is too small or too much', (done) => {
    const newTrip = {
      bus_id: 6,
      origin: 'Abule Egba',
      destination: 'Lekki',
      fare: 4,
    };
    request.post('/api/v1/trips').send(newTrip)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Fare should be between (\u20A6)50 and (\u20A6)10,000');
        done();
      });
  });
});

describe('PATCH /trips', () => {
  it('should cancel a trip successfully', (done) => {
    request.patch('/api/v1/trips/1').set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('Trip cancelled successfully');
        done();
      });
  });

  it('should throw an error if trip is cancelled already', (done) => {
    request.patch('/api/v1/trips/1').set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Trip is already cancelled');
        done();
      });
  });

  it('should throw an error if trip id is not a number', (done) => {
    request.patch('/api/v1/trips/one').set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Invalid trip ID');
        done();
      });
  });

  it('should throw an error if trip id is negative', (done) => {
    request.patch('/api/v1/trips/-1').set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Invalid trip ID');
        done();
      });
  });

  it('should throw an error if trip does not exist', (done) => {
    request.patch('/api/v1/trips/1000').set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Trip does not exist');
        done();
      });
  });
});

describe('GET /trips', () => {
  it('should retrieve all trips successfully', (done) => {
    request.get('/api/v1/trips').set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  describe('GET /trips?origin', () => {
    it('should return a trip that meets the origin query conditon', (done) => {
      request.get('/api/v1/trips?origin=Abule Egba').set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('CANNOT GET /trips', () => {
    before((done) => {
      pool.query('TRUNCATE ONLY trips RESTART IDENTITY CASCADE');
      done();
    });
    it('should return an error if no trips are available', (done) => {
      request.get('/api/v1/trips').set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('error');
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('No trips available');
          done();
        });
    });
  });
});
