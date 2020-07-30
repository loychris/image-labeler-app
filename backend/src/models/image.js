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
    labels: [{
        label: { type: String, required: true},
        votes: [{ type: Boolean }]
    }],
    imageSetId: {type: String },
    counter: { type: Number, default: 0 },
    goal: { required: true, type: Number, default: 5 },
    filename: { required: true, type: String }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;