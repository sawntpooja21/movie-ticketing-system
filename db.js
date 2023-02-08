// 'mongodb + srv://pooja:pooja@cluster0.m8jwrcw.mongodb.net/test'

const mongoose = require('mongoose')

module.exports = function dbConnect() {

    const url = 'mongodb+srv://pooja:<pooja>@cluster0.d5o0gw6.mongodb.net/test';

    const connectionParams = {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    }
    mongoose.set("strictQuery", false);
    mongoose.connect(url, connectionParams)
        .then(() => {
            console.log('Connected to the database ')
        })
        .catch((err) => {
            console.error(`Error connecting to the database. n${err}`);
        });

}