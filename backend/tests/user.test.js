const app = require('../src/app');
const User = require('../src/models/user');
const { uploader, labler, setupDatabase } = require('./fixtures/db');
const request = require('supertest');

beforeEach(setupDatabase);

test('Should login user', async () => {
    await request(app).post('/users/login').send({
        email: labler.email,
        password: labler.password
    }).expect(200);
})

test('Should not login user due to wrong credentials', async () => {
    const response = await request(app).post('/login').send({
        email: uploader.email,
        password: labler.password
    }).expect(404);
})

test('Should not log in nonexistent user', async () => {
    await request(app).post('/login').send({
        email: 'nonvalid@gmail.com',
        password: labler.password
    }).expect(404)
});

test('Should logout', async () => {
    await request(app).post('/users/logout')
        .set('Authorization', `Bearer ${labler.tokens[0].token}`).
        send().expect(200);
})

test('Should logout all', async () => {
    await request(app).post('/users/logoutall')
        .set('Authorization', `Bearer ${labler.tokens[0].token}`).
        send().expect(200);
})
