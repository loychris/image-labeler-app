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
  res.status(201).send({msg: 'image added successfully'});

}, (error, req, res, next) => {
  res.status(415).send({error: "Non valid file type"})
})

module.exports = router;
