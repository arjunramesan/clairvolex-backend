const request = require('supertest');
const app = require('../server');

describe('/books endpoint', () => {
  let token;
  beforeAll(async () => {
    try {
      const response = await request(app)
        .post('/generate-token')
        .send({ useremail: "testuser@gmail.com" });

      if (response.status !== 200) {
        throw new Error('Failed to generate token');
      }
      token = response.body.token;
    } catch (error) {
      console.error('Error generating token:', error.message);
      throw error; // Rethrow the error to fail the test suite
    }
  });

  it('returns valid data with a title', async () => {
    await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'The Great Gatsby' })
      .expect(200)
      .then(response => {
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data[0].title).toContain('The Great Gatsby');
      });
  });

  it('returns valid data without any parameter', async () => {
    await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(200)
      .then(response => {
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toBeGreaterThan(0);
      });
  });

  it('returns valid data with in stock filter', async () => {
    await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ inStock: true })
      .expect(200)
      .then(response => {
        expect(response.body.data.every(book => book.stock_count > 0)).toBeTruthy();
      });
  });

  it('returns valid data with date filter', async () => {
    await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ publishedFrom: '1950-01-01', publishedTo: '1970-12-31' })
      .expect(200)
      .then(response => {
        response.body.data.forEach(book => {
          const publicationDate = new Date(book.publication_date).getTime(); // Convert date to timestamp
          const fromDate = new Date('1950-01-01').getTime(); // Convert from date to timestamp
          const toDate = new Date('1970-12-31').getTime(); // Convert to date to timestamp
  
          expect(publicationDate).toBeGreaterThanOrEqual(fromDate);
          expect(publicationDate).toBeLessThanOrEqual(toDate);
        });
      });
  });

  it('returns valid data with pagination', async () => {
    const size = 5;
    await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ page: 1, size })
      .expect(200)
      .then(response => {
        expect(response.body.data.length).toBeLessThanOrEqual(size);
      });
  });

  it('returns valid data with incorrect data', async () => {
    await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Nonexistent Book' })
      .expect(200)
      .then(response => {
        expect(response.body.data.length).toBe(0);
      });
  });
});


describe('Token functionality', () => {
  let validToken;

  let token;
  beforeAll(async () => {
    try {
      const response = await request(app)
        .post('/generate-token')
        .send({ useremail: "testuser@gmail.com" });

      if (response.status !== 200) {
        throw new Error('Failed to generate token');
      }
      validToken = response.body.token;
    } catch (error) {
      console.error('Error generating token:', error.message);
      throw error; // Rethrow the error to fail the test suite
    }
  });


  it('allows access with a valid token', async () => {
    await request(app)
      .post('/books') // Replace with an actual protected route
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200); // Or whatever success code your API returns
  });

  it('denies access with an incorrect token', async () => {
    const incorrectToken = "Bearer incorrectTokenHere";

    await request(app)
      .post('/books') // Replace with an actual protected route
      .set('Authorization', incorrectToken)
      .expect(403); // Assuming your API returns 403 for forbidden access
  });
});
