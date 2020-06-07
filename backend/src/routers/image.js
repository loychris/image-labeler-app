const express = require('express');
const multer = require('multer');

const router = express.Router();

const auth = require('../middleware/auth')
const Image = require('../models/image')

const upload = multer({
  limits: {
    fileSize: 10000000    // 10mb
  },
  fileFilter(req, file, callback){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return callback( new Error('Non valid file type'))
    }
    callback(undefined, true);
  }
})

router.post('/upload',auth ,upload.single('image') ,async (req, res, next) => {

  const img = new Image({
    data: req.file.buffer,
    owner: req.user._id,
    lables: []
  })
  await img.save();
  res.status(201).send({ msg: 'image added successfully'});


}, (error, req, res, next) => {
  res.status(415).send({error: "Non valid file type"})
})


router.patch('/images/:id', auth, async (req, res, next) => {

  const updates = Object.keys(req.body);

  try{

    const image = await Image.findOne({_id:req.params.id, owner: req.user._id})

    if(!image){ return res.status(401).send({error: 'No image with this ID was found'}) }

    if(updates.length === 0 ){ return res.status(400).send({error: 'No updates'}) }



    req.body[updates].forEach( update => image.labels.push({label: update, votes: [true]}))

    await image.save();
    res.status(200).send(image);

  }catch (e) {
    res.status(500).send(e.message)
  }

})


router.get('/labels', async (req, res, next) => {
  try {
    const images = await Image.find()
    const labels = images.map(image=>image.labels)

    console.log(labels);
    res.status(200).send(images)
  }
  catch(e){
    res.status(500).send(e)
  }
})


router.get('/images', async (req, res) => {
  let images;
  try {
    images = await Image.find({});
    console.log(images);
    res.status(200).send(images);
  }
  catch(e){
    res.status(500).send(e);
  }
})


router.get('/users/:id/images', async (req, res) => {
  try {
    const images = await Image.find({owner: req.user._id})
    console.log(images);
    res.status(200).send(images);
  }
  catch(e){
    res.status(500).send(e);
  }
})


router.get('labels/', async (req,res) => {
  try {
    const images = await Image.find({label: req.params.labels.label};
    console.log(images);
    res.status(200).send(images);
  }
  catch(e){
    res.status(500).send(e);
  }
})


router.get('images/:id', async (req, res, next) => {
  const id = req.params.id;
  let image;
  try {
    image = await Image.findById(id, () => console.log("image found"));
    res.status(200).send(image);
  }
  catch(e){
    res.status(500).send(e);
  }
})


router.delete('images/:id', async (req, res) => {
  const id = req.params.id;
  let image;
  try {
    image = await Image.findByIdAndDelete(id, () => console.log("image deleted"));
  }
  catch(e){
    res.status(500).send(e);
  }
})


module.exports = router;
