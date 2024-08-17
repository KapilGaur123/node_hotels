const express = require('express');
const app = express();
const db = require('./db'); //import db 
require('dotenv').config();

const passport = require('./auth');


//using body parser to conver data json to object and vise varsa
const bodyParser = require('body-parser');
app.use(bodyParser.json())
//process .env file & give a online port
const PORT = process.env.PORT || 8000;

//middleware function 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest)

app.use(passport.initialize()); //initialize the passport 
const localAuthentication =  passport.authenticate('local',{session:false})

app.get('/', function (req, res) {
    res.send('welcome to our hotel sir')
})


// import Routes files
const personRoutes = require("./Routes/personRoute");
const MenuItemRoutes = require("./Routes/MenuItemRoutes")

//use Routes files
app.use('/person', /*localAuthentication,*/ personRoutes);
app.use('/menu', MenuItemRoutes)

app.listen(PORT, () => {
    console.log('server is live');

})