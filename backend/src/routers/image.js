const express = require('express');
const multer = require('multer');
const moment = require('moment');

const router = express.Router();

const auth = require('../middleware/auth')
const achievements = require('../middleware/achievements')
const Image = require('../models/image')

// CONFIGURE UPLOADE FILES
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


// ------------------------ GET ROUTES ------------------------

// Get all available labels- no duplicates
router.get('/labels', async (req, res) => {
  try {
    const images = await Image.find()
    let labelsList = [];
    const labels = images.map( image => {
      if (image.labels.length > 0 ){
        labelsList = labelsList.concat(image.labels.map( label => label.label ));
      }
    })
    res.status(200).send(Array.from(new Set(labelsList)));
  }
  catch (e) {
    res.status(500).send(e)
  }
})

// Get image by id
router.get('/images/id/:id', async (req, res) => {
  try{

    const image = await Image.find({_id:req.params.id});
    if(!image){ res.status(404).send('No image with given ID found'); }

    res.status(200).send(image);

  }catch(e){
    res.status(500).send(e)
  }
})

// Get all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    if(!images){
      res.status(404).send('No images found');
    }
    res.status(200).send(images);
  } catch (e) {
    res.status(500).send(e);
  }
})

// Get all images of a user id
router.get('/users/me/images', auth, async (req, res) => {
  try {
    const images = await Image.find({owner:req.user._id});
    res.status(200).send(images);
  } catch (e) {
    res.status(500).send(e);
  }
})

// Get next n Images - only images that the user did not voted for yet
router.get('/images/next/:n', auth, async  (req, res) => {

  const labeledImagesID = req.user.labeledImagesID; // images the user already have been labeled
  const n = req.params.n;

  try {
    let images = await Image.find()

    images = images.map( image => !labeledImagesID.includes(image._id) && image  )

    if (!images){ res.status(400).send('no images found'); }

    if (images.length < n){ res.status(400).send(`There was no ${n} images`) }

    res.status(200).send(images.slice(0,n));
  } catch (e) {
    res.status(500).send(e)
  }

} )



// ------------------------ POST ROUTES ------------------------

// Upload a new image
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  if  (req.file !== undefined){
    const img = new Image({
      data: req.file.buffer,
      owner: req.user._id,
      labels: [{label:req.body.label, votes:[true]}]
    })
    await img.save();
    res.status(201).send({ msg: 'image added successfully' });
  }
  else{
    res.status(400).send('Please add a file to upload');
  }

}, (error, req, res, next) => {
  res.status(415).send({ error: "Non valid file type" })
})

// Vote for image
router.post('/images/:id',auth, achievements,async (req, res) => {

  const {vote, label} = req.body;
  const user = req.user;
  let flag = true;

  try {
    let image = await Image.findOne({_id: req.params.id});

    if (!image) {
      return res.status(401).send({error: 'No image with this ID was found'})
    }

    image.labels.map(labels => {
      if (labels.label === label){
        user.labeledImagesID.forEach( image => {
          if (image.imageID === req.params.id){ res.status(400).send("Already voted for this picture"); } })
        if (user.labeledImagesID.includes({imageID: req.params.id})){ res.status(400).send("Already voted for this picture"); }

        labels.votes.push(vote);
        user.labeledImagesID.push({imageID: req.params.id, timestamp: moment().format('L')});
        flag = false;
      }
    });

    if (flag){ res.status(400).send("Unvalid labels"); }

    user.counter = user.counter + 1;
    await image.save();
    await user.save();
    res.status(200).send(image.labels)
  } catch (e) {
    res.status(500).send(e);
  }
})

// Get next n Images IDS - only images that the user did not voted for yet
router.post('/images/next/:n/id', auth, async  (req, res) => {

  const labeledImagesID = req.user.labeledImagesID.map(img => img.imageID); // images the user already have been labeled
  let fetchedImagesID = req.user.fetchedImagesID;
  const label = req.body.label;
  const n = req.params.n;

  try {
    let toReturn = []
    let images = await Image.find({"labels.label" : label})

    // IMGS which have not been fetched or labeled by user return id and labels
    images.forEach( image => {
      if (!labeledImagesID.includes(image._id) && !fetchedImagesID.includes(image._id)){
        toReturn.push(image._id)
      }
    })

    if (toReturn.length < 1){ res.status(400).send('no images found'); }
    else{
      if (toReturn.length > n){toReturn = toReturn.slice(0,n)}
      req.user.fetchedImagesID = req.user.fetchedImagesID.concat(toReturn)
      await req.user.save();
      console.log(req.user.fetchedImagesID);
      res.status(200).send(toReturn);
    }


  } catch (e) {
    res.status(500).send(e)
  }

} )

// Get next Imgae - only images that the user did not voted for yet
router.post('/images/next/id', auth, async  (req, res) => {

  const labeledImagesID = req.user.labeledImagesID.map(img => img.imageID); // images the user already have been labeled
  let fetchedImagesID = req.user.fetchedImagesID;
  const label = req.body.label;
  console.log(req.user.fetchedImagesID);

  try {

    const toReturn = []
    let images = await Image.find({"labels.label" : label})

    // IMGS which have not been fetched or labeled by user return id and labels
    images.forEach( image => {
      if (!labeledImagesID.includes(image._id) && !fetchedImagesID.includes(image._id)){
        toReturn.push(image._id)
      }
    })

    if (toReturn.length < 1){ res.status(400).send('no images found'); }
    else{
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
} )

// Get image by label
router.post('/images', async (req, res) => {

  try {
    const images = await Image.find({"labels.label" : req.body.label})
    console.log(images);

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
    if (!image) { return res.status(401).send({error: 'No image with this ID was found'}) }
    res.status(201).send({msg:"Image deleted"});
  } catch (e) {
    res.status(500).send(e);
  }
})




module.exports = router;
