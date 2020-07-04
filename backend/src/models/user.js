const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    isUploader:{
        type: Boolean,
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        //cleaning unnecessary spaces
        trim: true,
        lowercase: true,
        validate(value) {
            if (!(validator.isEmail(value))) {
                throw new Error('Email is unvalid')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    labeledImagesID: [{
        imageID: {type: String},
        timestamp:{type: String}
    }],
    fetchedImagesID:[{
        type: String
    }],
    counter: {
        type: Number,
        default: 0
    },
    achievements: [
        {
            achievement: {type: String},
            date: {type: String}
        }
    ],
    createdAt:{
        timestamp: {type: String, default: moment().format().substr(0,10)}
    }
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'xxlablerxx')

    user.tokens = user.tokens.concat({ token })

    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) { throw new Error('Unable to log in'); }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) { throw new Error('Unable to log in'); }

    return user;
}

// Hash the password before saving (update/create user)
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);


module.exports = User;