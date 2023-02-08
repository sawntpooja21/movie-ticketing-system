const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieDetails = new Schema({
    name: String,
    venue: String,
    time: String,
    availableseats: Number
});

const movieModel = mongoose.model("movie", movieDetails);

module.exports = { movieModel }