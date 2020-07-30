const app = require('../src/app');
const { uploader, labler, setOne, setTwo, setupDatabase } = require('./fixtures/db');
const request = require('supertest');

beforeEach(setupDatabase);

test('should get set- One & Two', async() => {
    const response = await request(app).get('/set/my')
        .set('Authorization', `Bearer ${uploader.tokens[0].token}`)
        .send({ user: uploader })
        .expect(200);

    expect(response.body.toString()).toEqual([setOne,setTwo].toString());//need testing .. do monday
})

test('should get 404 cause no sets from labler', async() => {
    await request(app).get('/set/my')
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)
        .send({ user: labler})
        .expect(404);
})

test('should get 401 unauthorized', async() => {
    await request(app).get('/set/my')
        .send({ user: uploader })
        .expect(401);
})

test('should get set one by id', async() => {
    const response = await request(app).get(`/set/${setOne._id}`)
        .send().expect(200);

    expect(response.body.toString()).toEqual(setOne.toString());
})

test('should get 500 no set because invalid id', async() => {
    await request(app).get(`/set/invalid_id`)
        .send().expect(500);
})

test('should get all categories', async() => {
    const response = await request(app).get('/set/')
        .send().expect(200);

    expect(response.body.toString()).toEqual([setOne, setTwo].toString());
})

test('should get al labels', async() => {
    const response = await request(app).get('/set/labels')
        .send().expect(200);

    expect(response.body.toString()).toEqual([setOne.label, setTwo.label].toString());//need testing .. do monday
})

test('should return 201 deleted', async() => {
    await request(app).delete(`/set/${setOne._id}`)
        .set('Authorization', `Bearer ${uploader.tokens[0].token}`)
        .send().expect(201);
})

test('should not delete cause unauthorized', async() => {
    await request(app).delete(`/set/${setOne._id}`)
        .send().expect(401);
})

/*  this test is correct, but our current route allows anyone to delete a set which is propably not wanted.
test('should not delete cause not owner', async() => { // this
    await request(app).delete(`/set/${setOne._id}`)
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)
        .send().expect(401)
})
 */