import { buildServer } from '../src/buildServer';
import request from 'supertest';

const app = buildServer();

describe('/register', () => {
  it('should post to register and get 200', (done) => {
    request(app)
      .post('/register')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
