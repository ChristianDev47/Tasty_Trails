import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/dishStatus', () => {
  it('responds with JSON containing a list of status', async () => {
    const response = await request(app)
      .get('/api/dishStatus')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/dishStatus', () => {
  it('adds a new status to the database', async () => {
    const newDishStatus = {
        name: 'Test DishStatus'
    };
    const response = await request(app)
      .post('/api/dishStatus')
      .send(newDishStatus)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/dishStatus/:id', () => {
  it('updates an existing status in the database', async () => {
      const updatedDishStatus = {
          name: 'Updated Test DishStatus'
      };
      const response = await request(app)
        .patch('/api/dishStatus/5') 
        .send(updatedDishStatus)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated DishStatus');
  });
});

// DELETE TEST
describe('DELETE /api/dishStatus/:id', () => {
  it('deletes an existing status from the database', async () => {
    const response = await request(app)
      .delete('/api/dishStatus/5') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/dishStatus/:id', () => {
  it('responds with JSON containing the details of a specific status', async () => {
    const response = await request(app)
      .get('/api/dishStatus/1') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
