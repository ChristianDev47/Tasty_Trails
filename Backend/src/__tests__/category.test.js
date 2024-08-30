import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/categories', () => {
  it('responds with JSON containing a list of categories', async () => {
    const response = await request(app)
      .get('/api/categories')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/categories', () => {
  it('adds a new category to the database', async () => {
    const newCategory = {
        name: 'Test Category'
    };
    const response = await request(app)
      .post('/api/categories')
      .send(newCategory)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/categories/:id', () => {
  it('updates an existing category in the database', async () => {
      const updatedCategory = {
          name: 'Updated Test Category'
      };
      const response = await request(app)
        .patch('/api/categories/5') 
        .send(updatedCategory)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated Category');
  });
});

// DELETE TEST
describe('DELETE /api/categories/:id', () => {
  it('deletes an existing category from the database', async () => {
    const response = await request(app)
      .delete('/api/categories/5') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/categories/:id', () => {
  it('responds with JSON containing the details of a specific category', async () => {
    const response = await request(app)
      .get('/api/categories/1') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
