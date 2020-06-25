const mongoose = require("mongoose");

console.log("trying to connect to the db...");
mongoose.connect("mongodb+srv://tamir:cKLL78M7nb6zaCKB@cluster0-q2oo3.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("------------------------------------------- mongoose connected -------------------------------------------");})
    .catch((e) => {
        console.log(e);
    });
