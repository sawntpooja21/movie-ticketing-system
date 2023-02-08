const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingdetails = new Schema({
    username: String,
    venue: String,
    time: String,
    seats: String
});

const bookingModel = mongoose.model("booking", bookingdetails);

module.exports = { bookingModel }