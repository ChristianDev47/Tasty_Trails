import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/menuDishes', () => {
  it('responds with JSON containing a list of menu dishes', async () => {
    const response = await request(app)
      .get('/api/menuDishes')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/menuDishes', () => {
  it('adds a new dish in menu to the database', async () => {
    const newMenuDish = {
      user_id: 1,
      dish_id: 1,
      dish_status_id: 1
    };
    const response = await request(app)
      .post('/api/menuDishes')
      .send(newMenuDish)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/menuDishes/:id', () => {
  it('updates an existing dish in menu in the database', async () => {
      const updatedMenuDish = {
        dish_status_id: 1
      };
      const response = await request(app)
        .patch('/api/menuDishes/5') 
        .send(updatedMenuDish)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated MenuDish');
  });
});

// DELETE TEST
describe('DELETE /api/menuDishes/:id', () => {
  it('deletes an existing dish in menu from the database', async () => {
    const response = await request(app)
      .delete('/api/menuDishes/5') 
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/menuDishes/:id', () => {
  it('responds with JSON containing the details of a specific dish in menu', async () => {
    const response = await request(app)
      .get('/api/menuDishes/1') 
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
