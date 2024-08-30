import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/roles', () => {
  it('responds with JSON containing a list of roles', async () => {
    const response = await request(app)
      .get('/api/roles')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// GETBYID TEST
describe('GET /api/roles/:id', () => {
  it('responds with JSON containing the details of a specific role', async () => {
    const response = await request(app)
      .get('/api/roles/1') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
