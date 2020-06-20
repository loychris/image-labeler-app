const app = require('../src/app');
const User = require('../src/models/user');
const { uploader, labler, setupDatabase } = require('./fixtures/db');
const request = require('supertest');
const Image = require('../src/models/image');

beforeEach(setupDatabase);

test('get all labels', async () => {
    await request(app).get('/labels')
        .send().expect(200);
})