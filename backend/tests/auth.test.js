const request = require('supertest');
const app = require('../src/app');
const { connectDatabase, disconnectDatabase } = require('../src/config/database');

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe('Authentication and authorization', () => {
  it('registers a user and returns a token', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Test Admin',
        email: 'admin@example.com',
        password: 'SecurePass123',
        role: 'Admin',
        department: 'Administration'
      });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe('admin@example.com');
  });

  it('logs in with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'SecurePass123'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('rejects invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'wrong-password'
      });

    expect(response.status).toBe(401);
  });

  it('requires authentication for protected routes', async () => {
    const response = await request(app).get('/api/dashboard');
    expect(response.status).toBe(401);
  });
});
