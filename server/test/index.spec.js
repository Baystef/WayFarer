import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

let request;
beforeEach(() => {
  request = chai.request(server);
});

describe('HOME route', () => {
  it('should return a welcome message', async () => {
    const res = await request.get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal('Welcome to WayFarer');
  });
});
