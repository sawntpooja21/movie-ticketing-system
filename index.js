const express = require('express');
const app = express();

const dbConnect = require('./db');
const { userModel } = require('./schema/user');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const crypto = require("crypto");
const { movieModel } = require('./schema/movie');
const { bookingModel } = require('./schema/booking');



//db connection
dbConnect();

const PORT = 4000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server listening on PORT', PORT)
    }
})

//create user
app.post('/signup', async (req, res) => {
    try {
        const mobile = req.body.mobile;
        const response = await userModel.find({ mobile: mobile });
        if (response.length > 0) {
            res.send({ message: 'Your already registered! Login to the account', error_type: 1 });
        } else {
            const token = crypto.randomBytes(16).toString("hex");
            req.body.token = token;
            const user = new userModel(req.body)
            const response = await user.save();
            res.send({ message: 'registered successfully', data: response });
        }

    }
    catch (error) {
        res.send(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const mobile = req.body.mobile;
        const response = await userModel.find({ mobile: mobile });
        if (response.length < 0) {
            res.send({ message: 'No User found', error_type: 1 });
        }
        else {
            const token = crypto.randomBytes(16).toString("hex");
            req.body.token = token;
            const user = new userModel(req.body)
            const response = await user.save();
            res.send({ message: 'Logged In successfully', data: response });
        }
    }
    catch (error) {
        res.send(error);
    }
})


app.post('/addMovie', async (req, res) => {
    try {
        // const { name, venue, time, availableseats } = req.body;
        const user = new movieModel(req.body)
        const response = await user.save();
        res.send({ message: 'Added successfully', data: response });
    } catch (error) {
        res.send(error)
    }
})

app.post('/booking/:movieId', async (req, res) => {
    try {
        const { token } = req.body;
        const response = await userModel.findOne({ token: token });
        if (!response) {
            res.send({ message: 'No User found', error_type: 1 });
        } else {
            delete req.token;

            const movieData = await movieModel.findOne({ _id: req.body.movieId });
            if (movieData && movieData.availableseats > req.body.seats && movieData.time < new Date()) {
                const user = new bookingModel(req.body)
                const response = await user.save();
                const updateData = await movieModel.findOneAndUpdate({ _id: req.body.movieId }, { $inc: { 'availableseats': -(req.body.seats) } });
                res.send({ message: 'Booked successfully', data: response });
            } else {
                res.send({ message: 'No seats available' });
            }
        }
    } catch (error) {
        res.send(error)
    }
})

app.get('/movie/:id', async (req, res) => {
    try {
        const { token } = req.body;
        const response = await userModel.find({ token: token });
        if (!response) {
            res.send({ message: 'No User found', error_type: 1 });
        } else {
            const response = await movieModel.find({ _id: req.params.user_id });
            res.send({ message: 'movie fetched successfully', data: response });
        }
    } catch (error) {
        res.send(error)
    }
})


app.get('/movie/:location', async (req, res) => {
    try {
        const { token } = req.body;
        const response = await userModel.find({ token: token });
        if (!response) {
            res.send({ message: 'No User found', error_type: 1 });
        } else {
            const response = await movieModel.find({ location: req.params.location });
            res.send({ message: 'movies fetched successfully', data: response });
        }
    } catch (error) {
        res.send(error)
    }
})
module.exports = app;