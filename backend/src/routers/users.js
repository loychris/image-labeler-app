const express = require("express");
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth')
const acheivements = require('../middleware/achievements')

// ------------------------ GET ROUTES ------------------------

// Get all users
router.get('/', async (req, res) => {

    try {
        const users = await User.find();
        if (!users) {return res.status(404).send("no users found in database!") }

        res.status(200).send(users)
    } catch (e) {
        res.status(500).send("server error on ' GET('/') '")
    }
})

// Get account of user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {return res.status(404).send("User was not found"); }

        res.status(200).send(user);
    } catch (e) {
        res.status(500).send("server error")
    }
})

// Get my account
router.get('/me/profile', auth, async (req, res) => {
    res.status(200).send(req.user)
});


// Get n highest score
router.get('/highscores/:n', async (req, res) => {
    const n = req.params.n;

    try {
        let users = await User.find().sort({ counter: -1 });
        if (!users) {return res.status(404).send('no users found'); }

        if (users.length > n) { users = users.slice(0, n) }

        users = users.map(user => ({ _id: user._id, acheivements: user.acheivements, counter: user.counter }))

        res.status(200).send(users);
    } catch (e) {
        res(500).send({ e });
    }
})



// ------------------------ POST ROUTES ------------------------

// Register
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

// Log in
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (e) {
        res.status(400).send({ message: "Could not find user for email pw combination" });
    }
})

// Log out from this device for this account
router.post('/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save();
        res.status(200).send({ msg: "Logout successfully" })

    } catch (e) {
        res.status(500).send(e)
    }

})

// Log out from all devices for this user
router.post('/logoutall', auth, async (req, res) => {

    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({ msg: "Logout from all devices successfully, all registered tokens have been removed" })

    } catch (e) {
        res.status(500).send(e)
    }

})


// ------------------------ PATCH ROUTES ------------------------
// Update user by id - with verification feature, only allowed fields will be updated
router.patch('/:id', auth, async (req, res) => {

    const allowUpdates = ['name', 'email', 'password'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowUpdates.includes(update));

    try {
        const user = await req.user;

        if (isValidOperation) {
            updates.forEach(update => user[update] = req.body[update]);
            await user.save();
            res.status(201).send(user);
        } else {
            res.status(400).send({ error: 'invalid id' })
        }
    } catch (e) {
        res.status(500).send(e)

    }
})

// Clear fetchedImagesId list
router.patch('/me/clearfetched', auth, acheivements, async (req, res) => {
    try {
        const user = req.user;
        user.fetchedImagesID = [];
        await user.save();
        res.status(200).send('fetched images ids removed');
    } catch (e) {
        res.status(500).send(e);
    }
})


// ------------------------ DELETE ROUTES ------------------------
// Delete user by id
router.delete('/:id', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(201).send(req.user)

    } catch (e) {
        res.status(500).send(e);
    }
})


module.exports = router;
