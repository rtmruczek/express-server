import request from 'supertest';
import { buildServer } from '../src/buildServer';
import { logger } from '../src/middleware/logger';
import db from '../src/db';

const app = buildServer();
const logMock = jest.spyOn(logger, 'log');

describe('/register', () => {
  beforeAll(() => {
    db.createUser('test@test.com', 'test');
  });
  it('should post to register and get 200', async () => {
    await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ email: 'newuser@test.com', password: 'test' })
      .expect(200)
      .then((res) => {});
  });
  it('should post to register and get 200 and log if user exists', async () => {
    await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ email: 'test@test.com', password: 'test' })
      .expect(200)
      .then((res) => {
        expect(logMock).toHaveBeenCalledTimes(1);
        expect(logMock).toHaveBeenCalledWith(
          'warn',
          'attempted to register with same email'
        );
      });
  });
});
