const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error...");
    }
})

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').trim().isLength({min: 2}),
    body('description', 'Description must have atleast 5 characters').trim().isLength({min: 5})
], async(req, res)=>{
    try {
        const { title, description} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()})
        }
        const note = new Notes({
            title, description, user: req.user.id
        });
        const savedNote = await note.save();
        
        res.json(savedNote);
    } catch (error) {
        res.status(500).send("Internal Server Error...");
    }
});

router.put('/updatenote/:id',fetchuser, async(req, res)=>{
    try {
        const { title, description } = req.body;
        const newNote = {}
        if(title){newNote.title = title};
        if(description){newNote.description = description};

        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(400).send("Not found...");
        }
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not allowed...")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});

    } catch (error) {
        res.status(500).send("Internal Server Error...");
    }
});

router.delete('/deletenote/:id',fetchuser, async(req, res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(400).send("Not found...");
        }
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not allowed...")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success": "Note has been deleted successfully..."});

        

    } catch (error) {
        res.status(500).send("Internal Server Error...");
    }
});

module.exports = router;