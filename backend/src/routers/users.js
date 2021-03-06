const express = require("express");
const moment = require('moment');

const User = require('../models/user');
const Image = require('../models/image');
const ImageSet = require('../models/set')

const acheivements = require('../middleware/achievements')
const auth = require('../middleware/auth')
const uploader = require('../middleware/uploader')


const router = express.Router();

// ------------------------ GET ROUTES ------------------------

// Get all users
router.get('/', async (req, res) => {

    try {
        const users = await User.find();
        if (!users) {return res.status(404).send("no users found in database!") }

        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
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
router.get('/me/profile', auth, async (req, res) => { res.status(200).send(req.user) });

// Get my labeling statistics
router.get('/me/labeled/statistics', auth ,async (req, res) => {
    try{
        const startOfTheWeek = moment().startOf('week').format('l');
        const endOfTheWeek = moment().endOf('week').format('l');

        const startOfTheMonth = moment().startOf('month').format('l');
        const endOfTheMonth = moment().endOf('month').format('l');

        const startOfTheYear = moment().startOf('year').format('l');
        const endOfTheYear = moment().endOf('year').format('l');

        const counter = req.user.counter;
        const labeled = req.user.labeledImagesID.map( image => moment(image.timestamp).format('l') );

        const today = labeled.filter(image => image === moment().format('l') );
        const week = labeled.filter(image => moment(image).isBetween(startOfTheWeek, endOfTheWeek, undefined, []));
        const month = labeled.filter(image => moment(image).isBetween(startOfTheMonth, endOfTheMonth, undefined, []));
        const year = labeled.filter(image => moment(image).isBetween(startOfTheYear, endOfTheYear, undefined, []));

        res.status(200).send({today: today.length, week: week.length, month: month.length, year: year.length, counter});

    }catch(e){
        res.status(500).send(e);
    }
});

// Get input for a machine or app (json/cvs)
router.get('/me/statistics', auth, uploader , async (req, res) => {
    try {
        const imageSets =await ImageSet.find({owner: req.user._id});
        let images =await Image.find({owner: req.user._id});


        if (!images || !imageSets){
            res.status(401).send({error: "Images/Image sets were not found"});
        }
        images = images.map( image => ({_id: image._id, votes: image.labels[0].votes, label: image.labels[0].label }))

        const populatedSets = imageSets.map( (imageSet) => {

            // Aggregation - all images of current set
            const currentSet = images.filter( image => image.imageSetId === imageSet._id);

            // Adding to the return obj labeledAsTrue counter and labeledAsFalse counter
            const returnVal = currentSet.map( image =>
                ({...image,
                    labeledAsTrue:image.votes.reduce((trues, current) => current, 0),
                    labeledAsFalse:image.votes.reduce((trues, current) => !current, 0)
                }))

            return returnVal
        })
        res.status(200).send({loaderId: req.user._id, populatedSets})
    }catch (e) {
        res.status(500).send(e)
    }

})

// Get n highest score
router.get('/highscores/:n', async (req, res) => {
    const n = req.params.n;

    try {
        let users = await User.find().sort({ counter: -1 });
        if (!users) {return res.status(404).send('no users found'); }

        if (users.length > n) { users = users.slice(0, n) }

        users = users.map(user => ({_id: user._id, name: user.name, achievements: user.achievements.length, counter: user.counter}))

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
