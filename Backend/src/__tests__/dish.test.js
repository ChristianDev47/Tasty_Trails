import request from 'supertest';
import app from '../app.js';

// GET TEST
describe('GET /api/dishes', () => {
  it('responds with JSON containing a list of dishes', async () => {
    const response = await request(app)
      .get('/api/dishes')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/dishes', () => {
  it('adds a new dish to the database', async () => {
      const newDish = {
        name: "Spaghetti Carbonara",
        category_id: 2,
        price: 12.99,
        weight: 300,
        calories: 450,
        proteins: 15,
        carbohydrates: 50,
        fats: 20,
        saturated_fats: 8,
        sugars: 5,
        dietary_fiber: 3,
        description: "Delicious Italian pasta dish made with spaghetti, eggs, pancetta, cheese, and black pepper."
      }

      const response = await request(app)
        .post('/api/dishes')
        .send(newDish)
        .expect('Content-Type', /json/)
        .expect(201);
        expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/dishes/:id', () => {
  it('updates an existing dish in the database', async () => {
      const updatedDish = {
          name: 'Spaghetti Carbonara Update'
      }
      const response = await request(app)
        .patch('/api/dishes/5') 
        .send(updatedDish)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated Category');
  });
});

// DELETE TEST
describe('DELETE /api/dishes/:id', () => {
  it('deletes an existing dish from the database', async () => {
      const response = await request(app)
        .delete('/api/dishes/5') 
        .expect(200)
  });
});

// GETBYID TEST
describe('GET /api/dishes/:id', () => {
  it('responds with JSON containing the details of a specific dish', async () => {
      const response = await request(app)
        .get('/api/dishes/1')
        .expect('Content-Type', /json/)
        .expect(200)
  });
});
