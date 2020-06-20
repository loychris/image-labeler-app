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






test('should sign up a new user', async () => {
    await request(app).post('/users/').send({
        email: 'newmail@gmail.com',
        password: labler.password
    }).expect(201);
})

test('should not sign up a new user because empty req', async () => {
    await request(app).post('/users/').send({

    }).expect(500);
})

test('should not get users/me because unauthenticated', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)
        .send({ user: labler }).expect(401);
})

test('should get /users/me', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)
        .send({ user: labler }).expect(200);
})

test('should get user with id', async () => {
    await request(app).get('/users/' + labler._id)
        .send().expect(200);
})

test('should not get user cause user doesnt exist', async () => {
    await request(app).get('users/invaliduseridstring42069')
        .send().expect(404);
})

test('delete own account while authenticated', async () => {
    await request(app).delete('users/' + labler._id)
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)
        .send().expect(201);
})// test delete other account issue isnt there and not sure if i should test for that

test('delete own account without authentication', async () => {
    await request(app).delete('users/' + labler._id)
        .send().expect(401);
})

