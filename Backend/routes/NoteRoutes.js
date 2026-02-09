import express from 'express';

import Notes from '../models/note.model.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post('/addnote', authMiddleware,async(req, res) => {
    try {
        const {title,description} = req.body;
        if(!title || !description){
            return res.status(400).json({error:"title and description is required"});
        }
        const newNote = new Notes({title,description,user:req.user._id});
        await newNote.save();

        return res.status(201).json({
            message : "Note added",
            note : newNote,
        })

    } catch (error) {
        console.log('error in addNote controller',error.message);
        res.status(500).json({error : "something went wrong"});
    }
})

router.get('/getnotes',authMiddleware,async(req,res)=>{
    try {
        const userNotes = await Notes.find({user : req.user._id});
        return res.status(200).json({notes :userNotes});
    } catch (error) {
        console.log('error in getNotes controller',error.message);
        return res.status(500).json({error:"internal server error"});
    }
})
// router.get('/getnotes/:page',authMiddleware,async(req,res)=>{
//     try {
//         const page = Number(req.params.page) || 1;
//         const userNotes = await Notes.find({user : req.user._id}).skip(6*(page-1)).limit(6);
//         return res.status(200).json({notes :userNotes});
//     } catch (error) {
//         console.log('error in getNotes controller',error.message);
//         return res.status(500).json({error:"internal server error"});
//     }
// })

router.put("/updateNote/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = await Notes.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/deleteNote/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Notes.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted",
      id: note._id
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;