import request from 'supertest';
import { buildServer } from '../src/buildServer';
import { logger } from '@middleware/logger';
import db from '@db/index';

const app = buildServer();
const logMock = jest.spyOn(logger, 'log');

describe('POST /register', () => {
  beforeAll(async () => {
    await db.createUser('test@test.com', 'test');
  });
  it('should get 200 for valid request', async () => {
    await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ email: 'newuser@test.com', password: 'test' })
      .expect(200);
  });
  it('should have created user', async () => {
    const user = await db.getUniqueUserByEmail('newuser@test.com');
    expect(user).toBeDefined();
  });
  it('should get 200 for valid request and log if user exists', async () => {
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
  it('should get 400 if invalid request', async () => {
    await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .expect(400);
  });
  it('should get 404 for invalid http verb', async () => {
    await request(app).get('/api/register').expect(404);
  });
});
