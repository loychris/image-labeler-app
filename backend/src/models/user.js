const mongoose = require("mongoose");
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        //cleaning unnecessary spaces
        trim: true ,
        lowercase: true,
        validate(value) {
            if(!(validator.isEmail(value))){
                throw new Error('Email is unvalid')
            }
        }
    },
    password:{
        type : String,
        trim : true,
        required: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})