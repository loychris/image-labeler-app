const express = require("express");
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth')


router.get('/me', auth, async (req, res) => { res.send(req.user) });

router.post('/', async (req, res) => {

    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    }
    catch (e) {
        res.status(500).send(e)
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
})

router.get('/', async (req, res) => {

    try {
        const users = await User.find();
        if (!users) { res.status(404).send() }
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {  res.status(404).send("User was not found"); };
        res.status(200).send(user);//mögliches problem ? -- sende user profile inklusive daten wie tokens und passwort ..
    } catch (e) {
        res.status(500).send(e);
    }
})

router.patch('/:id', auth ,async (req, res) => {

    const allowUpdates = ['name', 'email', 'password'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every( (update) => allowUpdates.includes(update));

    try {
        const user = await req.user;

        if (isValidOperation) {
            updates.forEach(update => user[update] = req.body[update]);
            await user.save();
            res.status(204).send(user);
        } else{
            res.status(400).send({error:'unvalid field'})
        }
    } catch (e) {
        res.status(500).send(e)

    }
})

router.delete('/users/:id', auth ,async (req, res) => {
    try {
        await req.user.remove()
        res.status(201).send(req.user)

    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save();
        res.status(200).send({ msg: "Logout successfully" })

    } catch (e) {
        res.status(500).send()
    }

})

router.post('/logoutall', auth, async (req, res) => {

    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({ msg: "Logout from all devices successfully, all registered tokens have been removed" })

    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router;
