const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');

const router = express.Router();

const fileUpload = require('../middleware/file-upload');
const auth = require('../middleware/auth')
const achievements = require('../middleware/achievements')
const Image = require('../models/image')
const SetOBJ = require('../models/set')




// ------------------------ GET ROUTES ------------------------

// Get all available labels- no duplicates
router.get('/labels', async (req, res) => {
  try {
    const sets = await SetOBJ.find()
    let labels = sets.map(s => s.label)
    res.status(200).send(labels);
  }
  catch (e) {
    res.status(500).send(e)
  }
})


// Get image by id
router.get('/images/id/:id', async (req, res) => {
  try {
    const image = await Image.find({ _id: req.params.id });
    if (!image) {return res.status(404).send('No image with given ID found'); }

    res.status(200).send(image);

  } catch (e) {
    res.status(500).send(e)
  }
})

// Get all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    if (!images) {return res.status(404).send('No images found');}

    res.status(200).send(images);
  } catch (e) {
    res.status(500).send(e);
  }
})

// Get all images of a user id
router.get('/users/me/images', auth, async (req, res) => {
  try {
    const images = await Image.find({ owner: req.user._id });
    res.status(200).send(images);
  } catch (e) {
    res.status(500).send(e);
  }
})

// Get next n Images - only images that the user did not voted for yet
router.get('/images/next/:n', auth, async (req, res) => {

  const labeledImagesID = req.user.labeledImagesID; // images the user already have been labeled
  const n = req.params.n;

  try {
    let images = await Image.find()

    images = images.map(image => !labeledImagesID.includes(image._id) && image)

    if (!images) {return res.status(400).send('no images found'); }

    if (images.length < n) {return res.status(200).send(images.slice(0, images.length)); }

    res.status(200).send(images.slice(0, n));
  } catch (e) {
    res.status(500).send(e)
  }

})

// Get next Imgae - only images that the user did not voted for yet
router.get('/images/next', auth, async (req, res) => {

  const labeledImagesID = req.user.labeledImagesID; // images the user already have been labeled

  try {
    let images = await Image.find();
    if (!images) { res.status(400).send('no images found'); }

    images = images.map(image => !labeledImagesID.includes(image._id) && image);
    console.log(images);

    if (!images.length) {return res.status(400).send(`no image left to label`); }

    res.status(200).send(images.slice(0, 1));
  } catch (e) {
    res.status(500).send(e)
  }

})



// ------------------------ POST ROUTES ------------------------



// Upload a new image
router.post('/upload', auth, fileUpload.single('image'), async (req, res) => {
  if(!req.body.label){
    res.status(400).send({message: 'No label provided'});
  }
  if(!req.body.filename){
    res.status(400).send({message: 'No filename provided'});
  }
  if  (req.file !== undefined){
    const img = new Image({
      data: req.file.buffer,
      owner: req.user._id,
      filename: req.body.filename,
      labels: [{label:req.body.label, votes:[]}]
    })
    try{
      await img.save();
      res.status(201).send({message: 'Image saved successfully', img: img});
    }catch(e){
      console.log(e)
      res.status(500).send({message: 'Something went wrong while saving the Image'});
    }
  }
  else {
    res.status(400).send('Please add a file to upload');
  }

}, (error, req, res, next) => {
  res.status(415).send({ error: "Non valid file type" })
})


// Vote for image
router.post('/images/:id', auth, async (req, res) => {

  const vote = req.body.vote === 'left';
  let err = null;
  let user = req.user;

  let image;
  let setObj;
  console.log('###############1')


  try {
    image = await Image.findOne({_id: req.params.id});
  } catch(e){
    err = 'There was a problem while finding the set or iamge';
  }
  console.log('###############2')

  try{
    setObj = await SetOBJ.findOne({_id: image.imageSetId})
  } catch(e){
    err = 'There was a problem finding the image';
  }
  console.log('###############3')

  if (!image) {
    err = 'No image found for Id'
  }
  if (!setObj) {
    err = 'No set found for id'
  }
  console.log('###############4')

    image.labels[0].votes.push(vote);
    user.labeledImagesID.push({ imageID: req.params.id, timestamp: moment().format('L') });
    image.counter = image.counter + 1;
    req.user.counter = req.user.counter + 1;
    setObj.counter = setObj.counter +1;

    await user.save();
    await image.save();
    await setObj.save();
  if(!err){
    res.status(200).send({msg: 'labeled successfully'});
  }else {
    console.log('###############', err)
    res.status(500).send();
    
  }




})

// Get next n Images IDS - only images that the user did not voted for yet
router.post('/images/next/:n/id', auth, async (req, res) => {


  if(!req.body.label) console.log('NO LABEL PROVIDED');
  const labeledImagesIDs = req.user.labeledImagesID.map(img => img.imageID); // images the user already have been labeled
  const label = req.body.label;
  const n = req.params.n;

  console.log('LABEL', label);
  console.log('N', n);
  console.log('LABELED IDS', labeledImagesIDs)
  console.log('FETCHED', req.user.fetchedImagesID);


  let images;
  let set;
  try {
    set = await SetOBJ.findOne({label: label});
    if(!set) console.log('no set found');
    images = await Image.find({ 
      $and: [
        {_id: { $nin: labeledImagesIDs}},
        {imageSetId: set._id},
      ]
    })
    if(!images) {
      console.log('no images found');
    }

    let toReturn = await images
      //.filter(i => i.goal > i.counter)
      .map(i => i._id)
      .slice(0,n)
    const diff = n - toReturn.length
    console.log('DIFF', diff);
    if(diff > 0){
      for(let i = 0;i<diff; i++){
        toReturn.push('no more');
      }
    }
    console.log('IMAGES', images);
    console.log('TO RETURN', toReturn);
    await req.user.save();
    res.status(200).send(toReturn);
  } catch (e) {
    console.log(e);
    res.status(500).send(e)
  }
})

// Get next Imgae - only images that the user did not voted for yet
router.post('/images/next/id', auth, async (req, res) => {

  const labeledImagesID = req.user.labeledImagesID.map(img => img.imageID); // images the user already have been labeled
  let fetchedImagesID = req.user.fetchedImagesID;
  const label = req.body.label;


  try {

    const toReturn = []
    let images = await Image.find({"labels.label" : label},  {_id:1, goal:1, counter:1})

    // IMGS which have not been fetched or labeled by user return id and labels
    images.forEach( image => {
      if (!labeledImagesID.includes(image._id) && !fetchedImagesID.includes(image._id) && image.goal > image.counter){
        toReturn.push(image._id)
      }
    })

    if (toReturn.length < 1) { res.status(400).send('no images found'); }
    else {
      const image = toReturn.pop();
      console.log(image)
      req.user.fetchedImagesID.push(image)
      await req.user.save();
      console.log(req.user.fetchedImagesID);
      res.status(200).send(image);
    }

  } catch (e) {
    res.status(500).send(e)
  }
})

// Get image by label
router.post('/images', async (req, res) => {

  try {
    const images = await Image.find({ "labels.label": req.body.label })
    console.log(images); //for debugging i guess, needs to be removed when not in use TODO

    res.status(200).send(images);
  } catch (e) {
    res.status(500).send(e);
  }
})
// ------------------------ PATCH ROUTES ------------------------

// Update Image - Still not in Use, planned to use in the future
router.patch('/images/:id', auth, async (req, res) => {

  const updates = Object.keys(req.body);
  try {
    const image = await Image.findOne({ _id: req.params.id, owner: req.user._id })
    if (!image) {
      return res.status(401).send({ error: 'No image with this ID was found' })
    }
    if (updates.length === 0) {
      return res.status(400).send({ error: 'No updates' })
    }

    req.body[updates].forEach(update => image.labels.push({ label: update, votes: [true] }))

    await image.save();
    res.status(200).send(image);

  } catch (e) {
    res.status(500).send(e.message)
  }
})


// ------------------------ DELETE ROUTES ------------------------

// Delete an image
router.delete('/images/:id', auth, async (req, res) => {
  try {
    const image = await Image.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!image) { return res.status(401).send({ error: 'No image with this ID was found' }) }
    res.status(201).send({ msg: "Image deleted" });
  } catch (e) {
    res.status(500).send({ error: e, message: "something went wrong, could not delete image" });
  }
})

router.delete('/images/', async (req, res, next) => {
  try{
      Image.remove({}, () => {
          console.log('Deleted all Images');
          res.status(200).send({msg: 'deleted All images'});
      })
  }catch(e){
      res.status(500).send({message: 'something went wrong while deleting all Images'});
  }
})




module.exports = router;
