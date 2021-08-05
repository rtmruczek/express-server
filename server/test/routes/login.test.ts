import request from 'supertest';
import { buildServer } from '../../src/buildServer';
import { logger } from '@middleware/logger';
import db from '@db/index';
import { hashPassword } from '@utils/crypt';
import { LoginRequestSignature } from '@routes/login';

const app = buildServer();
const logMock = jest.spyOn(logger, 'log');

const loginData: LoginRequestSignature = {
  email: 'test@test.com',
  password: 'test',
};

describe('POST /login', () => {
  beforeAll(async () => {
    await db.createUser(loginData.email, loginData.password);
  });

  it('should 200 if email/password is correct', async () => {
    await request(app).post('/api/login').send(loginData).expect(200);
  });

  it('should return 401 if email/password are incorrect', async () => {
    await request(app)
      .post('/api/login')
      .send({ email: 'test@test.com', password: 'test1' })
      .expect(401);
  });
});
