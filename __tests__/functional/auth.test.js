const request = require('supertest');
const app = require('../../src/app');

describe('Auth Tests', () => {
  
    it('should to return a jwt token', async () => {
        
        const response = await request(app)
        .post('/auth')
        .send({
            email: 'demo@demo.com',
            pwd: '123456'
        });

        const { status, body } = response;
        console.log('Test1', body);

        expect(status).toBe(200);
        expect(body.token).not.toBeNull();
    });

    it('should to return a error of user not found', async () => {
        
        const response = await request(app)
        .post('/auth')
        .send({
            email: 'demo@demo.com1',
            pwd: '123456'
        });

        const { status, body } = response;
        console.log('Test2', body);

        expect(status).toBe(400);
        expect(body.error).toBe('User not found.');
    });

    it('should to return a error of authentication', async () => {
        
        const response = await request(app)
        .post('/auth')
        .send({
            email: 'demo@demo.com',
            pwd: '123'
        });

        const { status, body } = response;
        console.log('Test3', body);

        expect(status).toBe(400);
        expect(body.error).toBe('Invalid credentials.');
    });

    it('should to return a error of credentials invalid', async () => {
        
        const response = await request(app)
        .post('/auth')
        .send({});

        const { status, body } = response;
        console.log('Test4', body);

        expect(status).toBe(400);
        expect(body.error).toBe('Invalid credentials.');
    });

});