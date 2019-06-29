import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

let request;
beforeEach(() => {
  request = chai.request(server);
});

describe('POST auth/signup', () => {
  it('should register a user successfully', (done) => {
    const newUser = {
      first_name: 'Don',
      last_name: 'Jazzy',
      email: 'donjazzy@yahoo.com',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('should not register user if s/he already exists', (done) => {
    const newUser = {
      first_name: 'Don',
      last_name: 'Jazzy',
      email: 'donjazzy@yahoo.com',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('User already exists');
        done();
      });
  });

  it('should not register a user if first name is missing', (done) => {
    const newUser = {
      last_name: 'Jazzy',
      email: 'donjazzy@yahoo.com',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('First name is required');
        done();
      });
  });

  it('should not register a user if last name is missing', (done) => {
    const newUser = {
      first_name: 'Don',
      email: 'donjazzy@yahoo.com',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Last name is required');
        done();
      });
  });

  it('should not register a user if email is missing', (done) => {
    const newUser = {
      first_name: 'Don',
      last_name: 'Jazzy',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Email is required');
        done();
      });
  });

  it('should not register a user if password is missing', (done) => {
    const newUser = {
      first_name: 'Don',
      last_name: 'Jazzy',
      email: 'donjazzy@yahoo.com',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Password is required');
        done();
      });
  });

  it('should not register a user if first name is less than 3 characters', (done) => {
    const newUser = {
      first_name: 'Do',
      last_name: 'Jazzy',
      email: 'donjazzy@yahoo.com',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('First name should be between 3 to 25 characters');
        done();
      });
  });

  it('should not register a user if last name is less than 3 characters', (done) => {
    const newUser = {
      first_name: 'Don',
      last_name: 'Ja',
      email: 'donjazzy@yahoo.com',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Last name should be between 3 to 25 characters');
        done();
      });
  });

  it('should not register a user if email is invalid', (done) => {
    const newUser = {
      first_name: 'Don',
      last_name: 'Jazzy',
      email: 'donjazzy.com',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Invalid Email Address');
        done();
      });
  });

  it('should not register a user if password is invalid', (done) => {
    const newUser = {
      first_name: 'Don',
      last_name: 'Jazzy',
      email: 'donjazzy@yahoo.com',
      password: 'secre',
    };
    request.post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Password must be atleast 8 to 100 characters');
        done();
      });
  });
});

describe('POST auth/signin', () => {
  it('should signin if user exists', (done) => {
    const user = {
      email: 'donjazzy@yahoo.com',
      password: 'secret10',
    };
    request.post('/api/v1/auth/signin').send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data.token).to.exist;
        done();
      });
  });

  it('should not signin if password is invalid', (done) => {
    const user = {
      email: 'donjazzy@yahoo.com',
      password: 'invalid',
    };
    request.post('/api/v1/auth/signin').send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Invalid Credentials');
        done();
      });
  });

  it('should not signin user if user does not exist', (done) => {
    const user = {
      email: 'peperenpe@gmail.com',
      password: 'notexist1',
    };
    request.post('/api/v1/auth/signin').send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Invalid Credentials');
        done();
      });
  });

  it('should not signin if email is missing', (done) => {
    const user = {
      password: 'noemail5',
    };
    request.post('/api/v1/auth/signin').send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Email is required');
        done();
      });
  });

  it('should not signin if password is missing', (done) => {
    const user = {
      email: 'nopass@hotmail.com',
    };
    request.post('/api/v1/auth/signin').send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Password is required');
        done();
      });
  });

  it('should not signin if email is invalid', (done) => {
    const user = {
      email: 'nopass@hot',
      password: 'invalid3',
    };
    request.post('/api/v1/auth/signin').send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.exist;
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Invalid Email Address');
        done();
      });
  });
});
