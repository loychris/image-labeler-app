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
        const user = await User.find();
        if (!user) { throw new Error('No users') }
        res.send(user)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const user = User.findOne(req.body.Id);
        res.send(user);
    } catch{
        res.status(404).send();
    }
})

router.patch('/update_profile', async (req, res) => {
    try {
        const user = req.user
        //authorization fehlt ! TODO

        if (req.body.id) { user.id = req.user.id };
        if (req.user.name) { user.name = req.user.name };
        if (req.user.email) { user.email = req.user.email };

        res.status(204).send();
    } catch (e) {
        res.status(401).send();
    }
})

router.delete('/delete_profile', async (req, res) => {
    try {
        const user = User.findOne({ id: req.user.Id });
        //authorization fehlt! TODO
        User.deleteOne({ id: user.Id });
        res.status(204).send();
    } catch (e) {
        res.status(401).send();
    }
})

router.post('/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save();
        res.send({ msg: "Logout successfully" })

    } catch (e) {
        res.status(500).send()
    }

})

router.post('/logoutall', auth, async (req, res) => {

    try {
        req.user.tokens = [];
        await req.user.save();
        res.send({ msg: "Logout from all devices successfully, all registered tokens have been removed" })

    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router;
