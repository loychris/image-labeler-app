const app = require('../src/app');
const User = require('../src/models/user');
const { uploader, labler, setupDatabase } = require('./fixtures/db');
const request = require('supertest');

beforeEach(setupDatabase);

test('Should login user', async () => {
    const response = await request(app).post('/users/login').send({
        email: labler.email,
        password: labler.password
    }).expect(200);

    const user = await User.findById(response.body.user._id);

    expect(response.body).toMatchObject({
        token: user.tokens[1].token
    })
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
        isUploader: true,
        name: 'Martin',
        email: 'newmail@gmail.com',
        password: labler.password
    }).expect(201);

    const test = await User.findOne({ email: 'newmail@gmail.com' });

    expect(test.body).not.toBe(null);

})

test('should not sign up a new user because empty req', async () => {
    const response = await request(app).post('/users/')
        .send().expect(500);
})

test('should not get users/me because unauthenticated', async () => {
    const response = await request(app).get('/users/me/profile')
        .send({ user: labler }).expect(401);

})

test('should get /users/me', async () => {
    const response = await request(app).get('/users/me/profile')
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)
        .send({ user: labler }).expect(200);
})

test('should get user with id', async () => {
    const response = await request(app).get(`/users/${labler._id}`)
        .send().expect(200);
    expect(response.body).toMatchObject({ email: labler.email });
})

test('should not get user cause user doesnt exist', async () => {
    await request(app).get('/users/5ef37e0d68b599600f67fcdd')
        .send().expect(404);
})

test('should delete own account while authenticated', async () => {
    const response = await request(app).delete('/users/' + labler._id)
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)
        .send().expect(201);

    const test = await User.findOne({ _id: labler._id });
    expect(test).toBe(null);
})// test delete other account issue isnt there and not sure if i should test for that

test('should not delete own account without authentication', async () => {
    const response = await request(app).delete('/users/' + labler._id)
        .send().expect(401);
})

test('should get users ranked by #labeled', async () => {
    const response = await request(app).get('/users/highscores/2')
        .send().expect(200);

    expect(response.body).toStrictEqual([
        { "_id": labler._id.toString(), "counter": 1 },
        { "_id": uploader._id.toString(), "counter": 0 }
    ])
})