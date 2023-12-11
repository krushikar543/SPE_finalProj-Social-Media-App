import supertest from 'supertest';
import app from '../index.js';
import { expect } from 'chai';
import bcrypt from 'bcrypt';

describe('Authenticate API test', function() {
  this.timeout(50000);

  it('authenticate a user with valid credentials', async () => {
    try {
      const userEmail = 'poi@gmail.com';
      const userPassword = 'poi';

      const response = await supertest(app)
        .post('/auth/login')
        .send({ email: userEmail, password: userPassword })
        .expect(200);

      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('user');

      const { token, user } = response.body;

      expect(token).to.be.a('string');
      expect(user).to.be.an('object');
      expect(user).to.have.property('email', userEmail);

      // Password Verification
      const isPasswordMatch = await bcrypt.compare(userPassword, user.password);
      expect(isPasswordMatch).to.be.true;
    } catch (error) {
      throw error; 
    }
  });

  it('reject authentication with invalid credentials', async () => {
    try {
      const userEmail = 'poi@gmail.com';
      const userPassword = 'po';

      const response = await supertest(app)
        .post('/auth/login')
        .send({ email: 'poi@gmail.com', password: 'po' })
        .expect(500);

    } catch (error) {
      throw error;
    }
  });

  it('User Doesnt Exist Testing', async () => {
    try {
      const userEmail = 'po@gmail.com';
      const userInvalidPassword = 'po';

      const response = await supertest(app)
        .post('/auth/login')
        .send({ email: 'po@gmail.com', password: 'po' })
        .expect(400);

      expect(response.body).to.have.property('msg', 'User Doesn\'t Exist');
    } catch (error) {
      throw error;
    }
  });
});
