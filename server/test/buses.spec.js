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

describe('POST /buses', () => {
  before((done) => {
    chai.request(server).post('/api/v1/auth/signin').send(admin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done();
      });
  });

  it('should add a new bus successfully', (done) => {
    const newBus = {
      number_plate: 'DA458YU',
      manufacturer: 'volvo',
      model: 'Arial150',
      capacity: 100,
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('should throw error if bus already exists', (done) => {
    const newBus = {
      number_plate: 'DA458YU',
      manufacturer: 'volvo',
      model: 'Arial150',
      capacity: 100,
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Bus already exists');
        done();
      });
  });

  it('should throw error if number plate is missing', (done) => {
    const newBus = {
      manufacturer: 'volvo',
      model: 'Arial150',
      capacity: 100,
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Number plate is required');
        done();
      });
  });

  it('should throw error if manufacturer is missing', (done) => {
    const newBus = {
      number_plate: 'DA458YU',
      model: 'Arial150',
      capacity: 100,
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Manufacturer is required');
        done();
      });
  });

  it('should throw error if model is missing', (done) => {
    const newBus = {
      number_plate: 'DA458YU',
      manufacturer: 'volvo',
      capacity: 100,
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Model is required');
        done();
      });
  });

  it('should throw error if capacity is missing', (done) => {
    const newBus = {
      number_plate: 'DA458YU',
      manufacturer: 'volvo',
      model: 'Arial150',
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Capacity is required');
        done();
      });
  });

  it.skip('should throw error if number plate is invalid', (done) => {
    const newBus = {
      number_plate: 'DA460',
      manufacturer: 'volvo',
      model: 'Arial150',
      capacity: 100,
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Number plate is invalid');
        done();
      });
  });

  it('should throw error if manufacturer name is too short/long', (done) => {
    const newBus = {
      number_plate: 'DA460YA',
      manufacturer: 'v',
      model: 'Arial150',
      capacity: 100,
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Manufacturer should be between 3 and 25 characters');
        done();
      });
  });

  it('should throw error if capacity is invalid', (done) => {
    const newBus = {
      number_plate: 'DA460YA',
      manufacturer: 'volvo',
      model: 'Arial150',
      capacity: 'two',
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Capacity must be an integer');
        done();
      });
  });

  it('should throw error if capacity is too small/large', (done) => {
    const newBus = {
      number_plate: 'DA460YA',
      manufacturer: 'volvo',
      model: 'Arial150',
      capacity: 2,
    };
    request.post('/api/v1/buses').send(newBus)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Minimum capacity is 7 and Maximum is 150');
        done();
      });
  });
});
