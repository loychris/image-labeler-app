const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const SetOBJ = require('../models/set');
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
        const sets = await SetOBJ.find({owner:req.user._id})
        if (!sets){
            res.status(404).send({error: 'No image collection found for this user'})
        }
        res.status(200).send(sets);
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/:id', async ( req, res) => {
    try {
        console.log(req.params.id);
        const set = await SetOBJ.findOne({_id:req.params.id})
        if (!set){
            res.status(404).send({error: 'No image collection found with this ID'})
        }
        res.status(200).send(set);
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/', async ( req, res) => {
    try {
        const sets = await SetOBJ.find()
        if (!sets){
            res.status(404).send({error: 'No image collection found for this user'})
        }
        res.status(200).send(sets);
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/labels', async (req,res) => {
    try {
        const sets = await SetOBJ.find()
        const labels = sets.map( set => {
            console.log(set.label);// should be taken out of final product .. i wont since this ain't mine
            return set.label
        } );
        res.status(200).send(Array.from(new Set(labels)));
    }
    catch (e) {
        res.status(500).send(e)
    }
})



router.post('/',auth, upload.single('image'), async ( req, res ) => {
    try {
        if  (req.file !== undefined){
            const set = new SetOBJ({
                owner: req.user._id,
                imageId: req.body.imageId,
                deadline: req.body.deadline,
                icon: req.file.buffer,
                label: req.body.label
            })
            const setCompleted = await set.save();
            console.log(setCompleted._id);
            req.user.imageSets.push(setCompleted._id)

            req.body.imageId.forEach( async (_id) => {
                const image = await Image.findOne({_id})
                image.imageSetId = setCompleted._id
            })

            res.status(201).send({ msg: 'set added successfully' });
        }
        else{
            res.status(400).send('Please add an icon to upload');
        }

    } catch (e) {
        res.status(500).send('Something went wrong');

    }
})

router.post('/next/:setId', auth, async  (req, res) => {
    const imageSetId = req.params.setId;
    const n = req.body.n;
    let toReturn = [];
    try {
        const images = await Image.find({imageSetId});
        images.forEach( image => {
            if (!labeledImagesID.includes(image._id) && !fetchedImagesID.includes(image._id)){
                toReturn.push(image._id)
            }
        })

        if (toReturn.length < 1){ res.status(400).send('no images found'); }
        else{
            if (toReturn.length > n){ toReturn = toReturn.slice(0,n)}
            req.user.fetchedImagesID = req.user.fetchedImagesID.concat(toReturn)
            await req.user.save();
            console.log(req.user.fetchedImagesID);
            res.status(200).send(toReturn);
        }
    } catch (e) { res.status(500).send(e) }
});



router.delete('/:id', async (req, res) => {
    try {
        await SetOBJ.findOneAndDelete({_id:req.params.id})
        res.status(201).send({message: "removed"});
    }catch (e) {
        res.status(500).send({error: "Something went wrong, the set was not removed"})
    }

})


module.exports = router;