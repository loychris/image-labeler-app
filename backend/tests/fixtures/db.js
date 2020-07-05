const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./../../src/models/user');
const Image = require('../../src/models/image');
const SetOBJ = require('../../src/models/set');


const lablerId = new mongoose.Types.ObjectId();
const uploaderId = new mongoose.Types.ObjectId();
const imgIdOne = new mongoose.Types.ObjectId();
const imgIdTwo = new mongoose.Types.ObjectId();
const setIdOne = new mongoose.Types.ObjectId();
const setIdTwo = new mongoose.Types.ObjectId();


const uploader = {
    _id: uploaderId,
    isUploader: true,
    counter: 0,
    name: 'Mike',
    email: 'uploader@gmail.com',
    password: 'uploaderPass3',
    tokens: [{
        token: jwt.sign({ _id: uploaderId }, 'xxlablerxx')
    }],
    labeledImagesId: [{}]
};

const labler = {
    _id: lablerId,
    isUploader: true,
    counter: 1,
    name: 'John',
    email: 'labler@gmail.com',
    password: 'lablerPass1',
    tokens: [{
        token: jwt.sign({ _id: lablerId }, 'xxlablerxx')
    }],
    labeledImagesId: [{
        imgIdOne
    }]
};

const imageOne = {
    _id: imgIdOne,
    owner: uploaderId,
    data: Buffer.from("testBuffer"),
    labels: [{ label: "labelOne", votes: [true, false, true] }]
}

const imageTwo = {
    _id: imgIdTwo,
    owner: uploaderId,
    data: Buffer.from("testBuffer"),
    labels: [{ label: "labelTwo", votes: [true, false, true] }]
}

const setOne = {
    _id: setIdOne,
    owner: uploader._id,
    label: "labelBoth",
    imageId: [imageOne._id, imageTwo._id],
    deadline: "09.07.2020",
}

const setTwo = {
    _id: setIdTwo,
    owner: uploader._id,
    label: "labeliOne",
    imageId: [imageOne._id],
    deadline: "09.07.2020",
}


//

const setupDatabase = async () => {
    // Before each drop the database
    await User.deleteMany();
    await Image.deleteMany();
    await new User(labler).save();
    await new User(uploader).save();
    await new Image(imageOne).save();
    await new Image(imageTwo).save();
};



module.exports = {
    lablerId, labler,
    uploaderId, uploader,
    imageTwo, imageOne, imgIdOne, imgIdTwo,
    setOne, setTwo, setIdOne, setIdTwo,
    setupDatabase
};