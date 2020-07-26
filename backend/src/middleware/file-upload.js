const multer = require('multer');


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}


const fileUpload = multer({
    limits: 10000000,
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('isvalid mime type!'); 
        cb(error, isValid); 
    }
});

module.exports = fileUpload;

