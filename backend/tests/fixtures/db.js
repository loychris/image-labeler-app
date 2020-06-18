const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./../../src/models/user');
const Image = require('../../src/models/image');


const lablerId = new mongoose.Types.ObjectId();
const uploaderId = new mongoose.Types.ObjectId();


const uploader = {
    _id : uploaderId,
    isUploader: true,
    name: 'Mike',
    email: 'uploader@gmail.com',
    password: 'uploaderPass3',
    tokens: [{
        token: jwt.sign({_id : uploaderId}, 'xxlablerxx')
    }]
};

const labler = {
    _id : lablerId,
    isUploader: true,
    name: 'John',
    email: 'labler@gmail.com',
    password: 'lablerPass1',
    tokens: [{
        token: jwt.sign({_id : lablerId}, 'xxlablerxx')
    }]
};


const setupDatabase = async ()=>{
    // Before each drop the database
    await User.deleteMany();
    await Image.deleteMany();
    await new User(labler).save();
    await new User(uploader).save();
};



module.exports = {
    lablerId, labler,
    uploaderId, uploader,
    setupDatabase
};