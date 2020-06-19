const express = require('express');
const multer = require('multer');

const router = express.Router();

const auth = require('../middleware/auth')
const Image = require('../models/image')

// CONFIGURE UPLOADE FILES
const upload = multer({
  limits: {
    fileSize: 10000000    // 10mb
  },
  fileFilter(req, file, callback) {
    console.log(file.originalname);
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

// Get image by label
router.get('/images/:label', async (req, res) => {

  console.log(1);
  try {
    const imageList = [];
    console.log(2);
    const images = await Image.find({})
    console.log(3);
    images.map(image => {
      const labelsList = image.labels.map(label => label.label);
      return labelsList.includes(req.params.label) ? imageList.push(image) : false
    })
    res.status(200).send(imageList);
  } catch (e) {
    res.status(500).send(e);
  }
})

// Get all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    console.log(images);
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

    if (images.length < n){ res.status(200).send(images.slice(0,images.length)); }

    res.status(200).send(images.slice(0,n));
  } catch (e) {
    res.status(500).send(e)
  }

} )

// Get next Imgae - only images that the user did not voted for yet
router.get('/images/next', auth, async  (req, res) => {

  const labeledImagesID = req.user.labeledImagesID; // images the user already have been labeled

  try {
    let images = await Image.find();
    if (!images){ res.status(400).send('no images found'); }

    images = images.map( image => !labeledImagesID.includes(image._id) && image  );
    console.log(images);

    if (!images.length){ res.status(400).send(`no image left to label`); }

    res.status(200).send(images.slice(0,1));
  } catch (e) {
    res.status(500).send(e)
  }

} )


// Get top n rating users with most labeled images
router.get('/users/highscores/:n', async (req, res) => {
    const n = req.params.n;
    
    try {
	let users = await User.find();
	if (!users) { res.status(400).send('no users found');}
	
	users.sort((a,b) => parseFloat(b.labeledImagesID.length) - parseFloat(a.labeledImagesID.length));
	if (users.length < n) { res.status(200).send(users.slice(0,user.length));}
        res.status(200).send(users.slice(0, n)); // sends back whole user objects -> needs to be changed
    } catch(e) {
	res(500).send(e);
    }
} )
    

// ------------------------ POST ROUTES ------------------------

// Upload a new image
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  const img = new Image({
    data: req.file.buffer,
    owner: req.user._id,
    lables: []
  })
  await img.save();

  res.status(201).send({ msg: 'image added successfully' });

}, (error, req, res, next) => {
  res.status(415).send({ error: "Non valid file type" })
})

// Vote for image
router.post('/images/:id', auth,async (req, res) => {

  const vote = req.body.vote;
  const user = req.user;
  console.log(user);

  try {
    const image = await Image.findOne({_id: req.params.id});
    if (!image) {
      return res.status(401).send({error: 'No image with this ID was found'})
    }
    image.labels.map(label => {
      if (label.label === req.body.label){
        if (user.labeledImagesID.includes(req.params.id)){
          res.status(400).send("Already voted for this picture");
        }
        label.votes.push(vote);
        user.labeledImagesID.push(req.params.id);
      }
    });

    await image.save();
    await user.save();
    res.status(205).send(image.labels)
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
    console.log(image);
    if (!image) { return res.status(401).send({error: 'No image with this ID was found'}) }
    await image.save();
    res.status(201).send({msg:"Image deleted"});
  } catch (e) {
    res.status(500).send(e);
  }
})




module.exports = router;
