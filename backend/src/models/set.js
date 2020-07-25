const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({

    owner: {type: String, required: true},
    label: {type: String, required: true},
    imageId: [{ type: String, required: true }],
    deadline:  { type: String },
    icon: { type: Buffer },
    goal: {type: Number, default: 1},
    counter: {type: Number, default: 0},
});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;