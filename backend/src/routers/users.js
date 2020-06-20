const express = require("express");
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth')

// ------------------------ GET ROUTES ------------------------

// Get all users
router.get('/', async (req, res) => {

    try {
        const users = await User.find();
        if (!users) { res.status(404).send() }
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// Get account of user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {  res.status(404).send("User was not found"); };
        res.status(200).send(user);//mögliches problem ? -- sende user profile inklusive daten wie tokens und passwort ..
    } catch (e) {
        res.status(500).send(e);
    }
})

// Get my account
router.get('/me', auth, async (req, res) => {
    console.log('123');
    res.status(200).send(req.user)
});


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
    console.log();
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
})

// Log out from this device for this account
router.post('/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save();
        res.status(200).send({ msg: "Logout successfully" })

    } catch (e) {
        res.status(500).send()
    }

})

// Log out from all devices for this user
router.post('/logoutall', auth, async (req, res) => {

    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({ msg: "Logout from all devices successfully, all registered tokens have been removed" })

    } catch (e) {
        res.status(500).send()
    }

})


// ------------------------ PATCH ROUTES ------------------------
// Update user by id - with verification feature, only allowed fields will be updated
router.patch('/:id', auth ,async (req, res) => {

    const allowUpdates = ['name', 'email', 'password'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every( (update) => allowUpdates.includes(update));

    try {
        const user = await req.user;

        if (isValidOperation) {
            updates.forEach(update => user[update] = req.body[update]);
            await user.save();
            res.status(201).send(user);
        } else{
            res.status(400).send({error:'unvalid field'})
        }
    } catch (e) {
        res.status(500).send(e)

    }
})

// Clear fetchedImagesId list
router.patch('/me/clearfetched', auth, async (req,res) => {
    try {
        const user = req.user;
        user.fetchedImagesID = [];
        await user.save();
        res.status(200).send('fetched images ids removed');
    }catch (e) {
        res.status(500).send(e);
    }
})


// ------------------------ DELETE ROUTES ------------------------
// Delete user by id
router.delete('/:id', auth ,async (req, res) => {
    try {
        await req.user.remove()
        res.status(201).send(req.user)

    } catch (e) {
        res.status(500).send(e);
    }
})



module.exports = router;
