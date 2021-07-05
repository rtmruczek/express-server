import { buildServer } from '../src/buildServer';
import request from 'supertest';

const app = buildServer();

describe('/register', () => {
  beforeAll(() => {
    const db = app.get('database');
    db.createUser({ email: 'test@test.com', password: 'test' });
  });
  it('should post to register and get 200', async () => {
    await request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({ email: 'test@test.com', password: 'test' })
      .expect(200)
      .then((res) => {});
  });
});
