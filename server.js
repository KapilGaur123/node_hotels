const express = require('express');
const app = express();
const db = require('./db'); //import db 

//using body parser to conver data json to object and vise varsa
const bodyParser = require('body-parser');
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send('welcome to our hotel sir')
})


// import Routes files
const personRoutes = require("./Routes/personRoute");
const MenuItemRoutes = require("./Routes/MenuItemRoutes")

//use Routes files
app.use('/person',personRoutes);
app.use('/menu', MenuItemRoutes)

app.listen(8000, () => {
    console.log('server is live');

})