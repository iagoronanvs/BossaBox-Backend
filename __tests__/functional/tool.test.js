const request = require('supertest');
const faker = require('faker');
const app = require('../../src/app');

describe('Tool Tests', () => {
    
    let token;
    let tool = {
        title: faker.name.title(),
        link: faker.internet.url(),
        description: faker.name.title(),
        tags: [faker.name.jobArea(), faker.name.jobArea(), faker.name.jobArea(), faker.name.jobArea()]
    };

    it('should to return error no token provided', async () => {        
        const response = await request(app)
        .get('/tools')
        .send();

        const { status, body } = response;
        console.log('Test5', body);

        expect(status).toBe(401);
        expect(body.error).toBe('No token provided.');
    });

    it('should to return error no token provided', async () => {        
        const response = await request(app)
        .post('/tools')
        .send({});

        const { status, body } = response;
        console.log('Test6', body);

        expect(status).toBe(401);
        expect(body.error).toBe('No token provided.');
    });

    it('should to return error no token provided', async () => {        
        const response = await request(app)
        .delete('/tools/1')
        .send({});

        const { status, body } = response;
        console.log('Test7', body);

        expect(status).toBe(401);
        expect(body.error).toBe('No token provided.');
    });

    it('should to return a new tool', async () => {

        const authResponse = await request(app)
        .post('/auth')
        .send({
            email: 'demo@demo.com',
            pwd: '123456'
        });

        token = authResponse.body.token;
    
        const response = await request(app)
        .post('/tools')
        .send(tool)
        .set('token', token);

        const { status, body } = response;
        console.log('Test8', body);

        expect(status).toBe(201);
        expect(body.id).not.toBeNull();
    });

    it('should to return list all registered tools', async () => {
        
        const response = await request(app)
        .get('/tools')
        .send()
        .set('token', token);

        const { status, body } = response;
        console.log('Test9', body);

        expect(status).toBe(200);
    });

    it('should to remove first tool', async () => {
        
        const response = await request(app)
        .get('/tools')
        .send()
        .set('token', token);        

        const responseDelete = await request(app)
        .delete(`/tools/${response.body[0].id}`)
        .send()
        .set('token', token);

        const { status } = responseDelete;

        console.log('Test10', responseDelete.body);

        const responseGet = await request(app)
        .get('/tools')
        .send()
        .set('token', token);

        const { body } = responseGet;

        console.log('Test10', body);

        expect(status).toBe(204);
    });


});