import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/orderStatus', () => {
  it('responds with JSON containing a list of status', async () => {
    const response = await request(app)
      .get('/api/orderStatus')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/orderStatus', () => {
  it('adds a new status to the database', async () => {
    const newOrderStatus = {
        name: 'Test OrderStatus'
    };
    const response = await request(app)
      .post('/api/orderStatus')
      .send(newOrderStatus)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/orderStatus/:id', () => {
  it('updates an existing status in the database', async () => {
      const updatedOrderStatus = {
          name: 'Updated Test OrderStatus'
      };
      const response = await request(app)
        .patch('/api/orderStatus/5') 
        .send(updatedOrderStatus)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated OrderStatus');
  });
});

// DELETE TEST
describe('DELETE /api/orderStatus/:id', () => {
  it('deletes an existing status from the database', async () => {
    const response = await request(app)
      .delete('/api/orderStatus/5') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/orderStatus/:id', () => {
  it('responds with JSON containing the details of a specific status', async () => {
    const response = await request(app)
      .get('/api/orderStatus/1') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
