const mongoose = require('mongoose');
const express = require('express');

const imageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer,
    maxlength: 10000000
  },
  label: {
    type: [String],
    required: true,
  },
  correctLabel: {
    type: [Number]//[#yes, #no]
  }

});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;