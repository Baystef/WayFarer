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
