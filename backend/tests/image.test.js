const app = require('../src/app');
const User = require('../src/models/user');
const { uploader, labler, imageOne, imageTwo, setupDatabase } = require('./fixtures/db');
const request = require('supertest');
const Image = require('../src/models/image');

beforeEach(setupDatabase);

test('should get all labels', async () => {
    await request(app).get('/labels')
        .send().expect(200);
})

test('should get img 1 by label', async () => {
    await request(app).get('/images/' + imageOne.labels[0].label)
        .send().expect(200).toBe(imageOne);// weiß nicht ob man beides gleichzeitig machen darf
})

test('should get all images', async () => {
    await request(app).get('/images')
        .send().expect.toBe([imageOne, imageTwo]);//not sure .. status isnt enough
})

test('should not get my images because no authentication', async () => {
    await request(app).get('/users/me/images')
        .send({ user: uploader }).expect(401);
})

test('should get my images', async () => {
    await request(app).get('/users/me/images')
        .set('Authorization', `Bearer ${uploader.tokens[0].token}`)
        .send.expect.toBe({ imageOne, imageTwo });
})

test('should not delete image because not owner', async => {
    await request(app).delete('/images/' + imageOne._id)
        .set('Authorization', `Bearer ${labler.tokens[0].token}`)//labler is not the owner of any image so he can't delete stuff
        .send({ user: labler }).expect.not(201);

    test = await Image.findOne({ _id: imageOne._id });
    test.expect.toBe(imageOne);
})

test('should not delete because unauthorized', async () => {
    await request(app).delete('/images/' + imageOne._id)
        .send({ user: uploader }).expect(401);//no authorization

    test = await Image.findOne({ _id: imageOne._id });//check if not deleted
    test.expect.toBe(imageOne);
})

test('should delete cause authorized owner', async () => {
    await request(app).delete('/images/' + imageOne._id)
        .set('Authorization', `Bearer ${uploader.tokens[0].token}`)
        .send({ user: uploader }).expect(201);

    test = await Image.findOne({ _id: imageOne._id });
    test.expect.not.toBe(imageOne);
})