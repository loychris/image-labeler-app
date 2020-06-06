const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    data:{
        required: true,
        type: Buffer
    },
    lables: [{
        lable: { type: String, required: true },
        votes:[{ type: Boolean }]
    }]

});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;