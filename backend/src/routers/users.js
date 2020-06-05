const express = require("express");
const router = express.Router();
const User = require("../models/user");

const auth = require('../middleware/auth')


router.get('/', auth ,async (req, res) => {
    res.send('msg')
})

router.post('/',async (req, res) => {

    const user = new User(req.body);

    try{
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send( {user, token} );
    }
    catch (e) {
        res.status(500).send(e)
    }
});

router.post('/login',async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch (e) {
        res.status(400).send();
    }
})

module.exports = router;
