const mongoose = require('mongoose');
const express = require('express');

const imageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    data: Buffer,
    contentType: String,
    maxlength: 10000000
  },
});
