const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Image = require('../models/image');
const SetOBJ = require('../models/set');
const multer = require('multer');
const auth = require('../middleware/auth')
const fileUpload = require('../middleware/file-upload');


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
        const sets = await SetOBJ.find({owner:req.user._id});
        if (!sets){
            res.status(404).send({error: 'No image collection found for this user'})
        }else{
            console.log(sets)
            res.status(200).send(sets);
        }
    }catch(e){
        res.status(500).send(e)
    }
})



router.get('/labels', async (req,res) => {
    try {
        const sets = await SetOBJ.find()
        const labels = sets.map( set => {
            //console.log(set.label);// should be taken out of final product .. i wont since this ain't mine
            return set.label
        } );
        res.status(200).send(Array.from(new Set(labels)));
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:id', async ( req, res) => {
    try {
        const set = await SetOBJ.findOne({_id:req.params.id})
        if (!set || set.length === 0){
            res.status(404).send({error: 'No image collection found with this ID'})
        }else {
            res.status(200).send(set);
        }
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
            console.log(set.label);
            return set.label
        } )
        res.status(200).send(Array.from(new Set(labels)))
    }
    catch (e) {
        res.status(500).send(e)
    }
})







router.post('/unlabeled', auth, async (req, res) => {
    const { setId } = req.body;
    console.log('SET ID', setId)
    let set; 
    try{
        set = await SetOBJ.findById(setId);
    }catch(e){
        console.log('THERE WAS A PROBLEM FINDING THE SET IN THE DB');
    }
    if(!set){
        res.status(400).send({ msg: 'set not found' });
    }
    const alreadyLabeled = req.user.labeledImagesID.map(x => {
        return x.imageID;
    });
    console.log('SETIDS: ', set.imageId, set.imageId.length)
    console.log('ALREADY LABELED: ', alreadyLabeled, alreadyLabeled.length)

    const unlabeledIds = set.imageId.filter(x => {
        return !alreadyLabeled.includes(x);
    })

    res.send(unlabeledIds);
})











router.post('/', auth, fileUpload.single('image'), async ( req, res ) => {
    if(!req.file) res.status(400).send({msg: 'no icon file attached'})
    if(!req.body.imageId) res.status(400).send({msg: 'no Image Ids given'})
    if(!req.body.label) res.status(400).send({msg:'no label definded'})
    if(!req.body.deadline) res.status(400).send({msg:'no deadline definded'})
    if(!req.body.goal) res.status(400).send({msg: 'No goal set'});
    const set = new SetOBJ({
        owner: req.user._id,
        imageId: req.body.imageId.split(','),
        deadline: req.body.deadline,
        icon: req.file.buffer,
        label: req.body.label,
        goal: req.body.goal
    })
    let setCompleted
    const imageIds = req.body.imageId.split(',')
    let images
    try{
        setCompleted = await set.save()
    }catch(e){
        console.log(e)
    }
    req.user.imageSets.push(setCompleted._id)
    try{
        images = await Image.find().where('_id').in(imageIds).exec()
    }catch(e){        
        console.log(e)
    }
    images.map(img => {
        img.imageSetId = setCompleted._id
        return img
    })
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await req.user.save({session: sess});
        for(let i=0;i<images.length; i++){
            await images[i].save({session: sess});
        }
        await sess.commitTransaction();

    }catch(e){
        console.log(e)
    }
    res.send({ setCompleted })
}); 


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


router.delete('/', async (req, res, next) => {
    try{
        SetOBJ.remove({}, () => {
            console.log('Deleted all sets');
            res.status(200).send({msg: 'deleted All sets'});
        })
    }catch(e){
        res.status(500).send({message: 'something went wrong while deleting all sets'});
    }
})

module.exports = router;