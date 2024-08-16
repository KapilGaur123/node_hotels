const mongoose = require('mongoose');

// define the mongoDB server connection
const mongoURL = "mongodb://localhost:27017/hotels";

// set up mongo connection
mongoose.connect(mongoURL);

const db = mongoose.connection;

// add the event listeners
db.on('connected', () => {
    console.log("connected to mongoDB server");
});

db.on('error', (err) => {
    console.log("some error occurred : ", err);
});

db.on('disconnected', () => {
    console.log("disconnected from mongoDB server");
});

module.exports = db;
