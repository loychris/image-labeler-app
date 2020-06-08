const express = require("express");
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth')


router.get('/me', auth, async (req, res) => {
    res.send(req.user)
});

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

router.get('/users', async (req, res) => {

    try {
        const users = await User.find();
        if (!user) { throw new Error('No users') }
        res.status(200).send(users)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) { throw new Error('user not found') };
        res.status(200).send(user);//mögliches problem ? -- sende user profile inklusive daten wie tokens und passwort ..
    } catch{
        res.status(404).send();
    }
})

router.patch('/users/:id', auth ,async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) { throw new Error('user not found') };
        //authorization fehlt ! TODO

        if (req.body.id) { user.id = req.body.id };
        if (req.body.name) { user.name = req.body.name };
        if (req.body.email) { user.email = req.body.email };
        await user.save();

        res.status(204).send(user);
    } catch (e) {
        res.status(401).send("something went wrong");
    }
})

router.delete('/users/:id', auth ,async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.Id });
        //authorization fehlt! TODO
        await User.deleteOne({ _id: user._id });
        await user.save();
        res.status(204).send("deleten complete");
    } catch (e) {
        res.status(500).send();
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
