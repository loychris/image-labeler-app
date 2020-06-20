const mongoose = require("mongoose");
const User = require('../models/user')
const Image = require('../models/image')

console.log("trying to connect to the db...");
mongoose.connect("mongodb+srv://chris:57NDc3sDIHvBHA7v@cluster0-q2oo3.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("------------------------------------------- mongoose connected -------------------------------------------");})
    .catch((e) => {
        console.log(e);
    });
//
// User.remove({}, (err)=>{
//     console.log("removed");
// })
// Image.remove({}, (err)=>{
//     console.log("removed");
// })