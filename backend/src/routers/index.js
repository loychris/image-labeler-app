const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  dest: 'images',
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

router.post('/upload', upload.single('image'),async (req, res, next) => {
  res.send();
}, (error, req, res, next) => {
  res.status(415).send({error: "Non valid file type"})
})

module.exports = router;
