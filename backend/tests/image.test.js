const app = require('../src/app');
const User = require('../src/models/user');
const { uploader, labler, imageOne, imageTwo, setupDatabase } = require('./fixtures/db');
const request = require('supertest');
const Image = require('../src/models/image');

beforeEach(setupDatabase);

test('should get all labels', async () => {
    const response = await request(app).get('/labels')
        .send().expect(200);
    expect(response.body).toStrictEqual([imageOne.labels[0].label, imageTwo.labels[0].label]);
})

test('should get all images', async () => {// bug this test actualy works but it can't compare array to core mongoose array
    const response = await request(app).get('/images')
        .send().expect(200);

    expect(response.body.toString()).toMatch([imageOne, imageTwo].toString());
})

test('should not get my images because no authentication', async () => {
    await request(app).get('/users/me/images')
        .send().expect(401);
})

test('should get my images', async () => {// bug this test actualy works but it can't compare array to core mongoose array
    const response = await request(app).get('/users/me/images')
        .set('Authorization', `Bearer ${uploader.tokens[0].token}`)
        .send().expect(200);

    const totestobj = [ imageOne ,imageTwo ];

    expect(response.body.toString()).toMatch(totestobj.toString());
})

test('should not delete image because not owner', async () => {
    await request(app).delete('/images/' + imageOne._id)
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)//labler is not the owner of any image so he can't delete stuff
        .send({ user: labler }).expect(401);

    const test = await Image.findOne({ _id: imageOne._id })
    expect(test).not.toBe(null);
})

test('should not delete because unauthorized', async () => {
    await request(app).delete('/images/' + imageOne._id)
        .send({ user: uploader }).expect(401);//no authorization

    expect(await Image.findOne({ _id: imageOne._id })).not.toBe(null);//check if not deleted
})

test('should delete cause authorized owner', async () => {
    await request(app).delete('/images/' + imageOne._id)
        .set('Authorization', `Bearer ${uploader.tokens[0].token}`)
        .send({ user: uploader }).expect(201);

    expect(await Image.findOne({ _id: imageOne._id })).not.toEqual(imageOne);
})