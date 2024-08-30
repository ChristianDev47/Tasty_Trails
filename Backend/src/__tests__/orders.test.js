import request from 'supertest';
import app from '../app.js';

let token; 

beforeAll((done) => {
  request(app)
    .post('/api/login')  
    .send({ username: 'admin', password: 'Admin123$' })
    .end((err, res) => {
      if (err) return done(err);
      token = res.body.token; 
      done();
    });
});


// GET TEST
describe('GET /api/orders', () => {
  it('responds with JSON containing a list of orders', async () => {
    const response = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body).toBeInstanceOf(Array); 
  });
});

// POST TEST
describe('POST /api/orders', () => {
  it('adds a new order to the database', async () => {
    const newOrder = {
      user_id: 1,
      order_status_id: 1,
      direction: "prueba",
      phone: "354556",
      dishes: [
        {
          dish_id: 1,
          count: 2
        }
      ]
    };
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(newOrder)
      .expect('Content-Type', /json/)
      .expect(201)
      expect(response.body).toHaveProperty('id');
  });
});

// PATCH TEST
describe('PATCH /api/orders/:id', () => {
  it('updates an existing order in the database', async () => {
      const updatedOrder = {
        order_status_id: 5,
      };
      const response = await request(app)
        .patch('/api/orders/5') 
        .set('Authorization', `Bearer ${token}`)
        .send(updatedOrder)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body.name).toBe('Updated Order');
  });
});

// DELETE TEST
describe('DELETE /api/orders/:id', () => {
  it('deletes an existing order from the database', async () => {
    const response = await request(app)
      .delete('/api/orders/5') 
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});

// GETBYID TEST
describe('GET /api/orders/:id', () => {
  it('responds with JSON containing the details of a specific order', async () => {
    const response = await request(app)
      .get('/api/orders/1') 
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

// GETBYUDERID TEST
describe('GET /api/orders/user/:id', () => {
  it('responds with JSON containing the orders of a specific user', async () => {
    const response = await request(app)
      .get('/api/orders/user/1') 
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
