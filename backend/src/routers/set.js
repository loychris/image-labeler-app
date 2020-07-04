const express = require('express');
const router = express.Router();

const Set = require('../models/set');
const multer = require('multer');
const auth = require('../middleware/auth')

const upload = multer({
    limits: {
        fileSize: 10000000    // 10mb
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Non valid file type'))
        }
        callback(undefined, true);
    }
})
router.get('/my', auth, async ( req, res) => {
    try {
        const sets = await Set.find({owner:})
    }catch(e){

    }
})

router.post('/',auth, upload.single('image'), async ( req, res ) => {
    try {
        if  (req.file !== undefined){
            const set = new Set({
                owner: req.user._id,
                imageId: req.body.imageId,
                deadline: req.body.deadline,
                icon: req.file.buffer,
                label: req.body.label
            })
            await set.save();
            res.status(201).send({ msg: 'set added successfully' });
        }
        else{
            res.status(400).send('Please add an icon to upload');
        }

    } catch (e) {
        res.status(500).send('Something went wrong');

    }
})


module.exports = router;