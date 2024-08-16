const mongoose = require('mongoose');
require('dotenv').config();

// define the mongoDB server connection but this is for local 
// const mongoURL = process.env.MONGODB_URL_LOCAL; 

// define the mongoDB server connection but this is use for hosting 
const MONGODB_URL = process.env.DB_URL;

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

