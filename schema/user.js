const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDetails = new Schema({
    name: String,
    location: String,
    mobile: String,
    token: String
});

const userModel = mongoose.model("user", userDetails);

module.exports = { userModel }