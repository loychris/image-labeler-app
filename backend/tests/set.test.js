const app = require('../src/app');
const User = require('../src/models/user');
const { uploader, labler, imageOne, imageTwo, setOne, setTwo, setupDatabase } = require('./fixtures/db');
const request = require('supertest');
const Image = require('../src/models/image');

const SetOBJ = require('../src/models/set');

beforeEach(setupDatabase);

test('should get set- One & Two', async() => {
    const response = await request(app).get('/set/my')
        .set('Authorization', `Bearer ${uploader.tokens[0].token}`)
        .send({ user: uploader })
        .expect(200);

    expect(response.body.toString()).toEqual([setOne,setTwo].toString());//need testing .. do monday
})

test('should get set one by id', async() => {
    const response = await request(app).get(`/set/${setOne._id}`)
        .send().expect(200);

    expect(response.body.toString()).toEqual(setOne.toString());
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