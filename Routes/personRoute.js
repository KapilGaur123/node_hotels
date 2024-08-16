const express = require('express');
const routes = express.Router();
const person = require('../moduls/person'); //import person model

routes.post('/', async (req, res) => {
    try {
        const data = req.body; // user send the data and it will stored on rep.body

        const newPerson = new person(data);//create the new person document using mongoose model

        //we will wait untill the data is saved 
        const response = await newPerson.save();
        console.log("data stored successfully");
        res.status(200).json(response)

    }
    catch (err) {
        console.log('server error occured :');
        res.status(500).json({ error: 'server side error' })

    }
})

routes.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log("data fetched successfully");
        res.status(200).json(data)
    }
    catch (err) {
        console.log('server error occured :');
        res.status(500).json({ error: 'server did not sent data so, side error' })
    }
})

// :workType is a parameter-variabe this is stored in variable
routes.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: "invailed work type" })
        }
    }
    catch (err) {
        console.log("person data not fetched", err);
        res.status(500).json({ error: "sorry,server error  on workType" })
    }
})

routes.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // run the updated document
            runValidators: true // run mongoose validation
        })

        // this if() is used for if id is not validate or wrong id
        if (!response) {
            return res.status(404).json({ error: "person not found" })
        }

        console.log('data updated');
        res.status(200).json(response)
    }
    catch (err) {
        console.log("person data not updated", err);
        res.status(500).json({ error: "sorry,server error  for update" })
    }
})

routes.delete('/:id', async (req,res) => {
    try{
        const personId = req.params.id;

        const response = await person.findByIdAndDelete(personId);

        if (!response) {
            // Return after sending the 404 response
            return res.status(404).json({ error: "Person not deleted" });
        }

        res.status(200).json({ message: "Person successfully deleted" });
    }
    catch(err){
        console.log("Error deleting person:", err);
        res.status(500).json({ error: "Sorry, server error occurred during deletion" });
    }
})

module.exports = routes;