const express = require('express')
const routes = express.Router();
const MenuItem = require('../moduls/MenuItem') //import

routes.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);

        const savaData = await newMenu.save();
        console.log('Menu data is stored');
        res.status(200).json(savaData);
    }
    catch (err) {
        console.log('server error occured menu not saved:');
        res.status(500).json({ error: 'server side error' })
    }
})

routes.get('/', async (req, res) => {
    try {
        const menuData = await MenuItem.find();
        console.log("Fatch menu data is succenssfully");
        res.status(200).json(menuData);
    }
    catch (err) {
        console.log("mune data not fetched");
        res.status(500).json({ error: "sorry,server error" })
    }
})

routes.get('/:taste', async (req, res) => {
    try {
        const taste_var = req.params.taste;
        if (taste_var === 'sweet' || taste_var === 'spicy' || taste_var === 'sour') {
            const taste_response = await MenuItem.find({ taste: taste_var });
            console.log("fetch successfully");
            res.status(200).json(taste_response);
        }
        else {
            console.log("invailed taste entered by you");
            res.status(404).json({ error: "invailed taste type" })
        }
    }
    catch (err) {
        console.log("menu data not fetched", err);
        res.status(500).json({ error: "sorry, server error  on workType" })
    }
})

routes.put('/:id', async (req,res) => {
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const menu_response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true
        })

        if(!menu_response){
            return res.status(404).json({error:"user enter wrong data"})
        }

        res.status(200).json(menu_response);
    }
    catch(err){
        console.log('some error comes');
        res.status(500).json({err:"error 2.O"})        
    }
})

routes.delete('/:id', async (req,res) => {
    try{
        const menuId = req.params.id;

        const delete_response = await MenuItem.findByIdAndDelete(menuId);

        if(!delete_response){
            return res.status(404).json({error:"user enter wrong data"})
        }

        res.status(200).json({massage:"delete successfully"});
    }
    catch(err){
        console.log("Error deleting person:", err);
        res.status(500).json({ error: "Sorry, server error occurred during deletion" });
    }
})

// export the routes in menu routes
module.exports = routes;