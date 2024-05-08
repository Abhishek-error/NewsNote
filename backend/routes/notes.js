const express = require('express');
const {body, validationResult} = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const router = express.Router();


   router.post('/addnote', fetchuser, [
     body('title', "Enter a valid Title ").isLength({min: 3}),
     body('description', "Enter a valid Discription ").isLength({min: 10})
   ], async (req, res) => {
try{
const {title, description, tag} = req.body;
const errors = validationResult(req);
if(!errors.isEmpty()){
   return res.status(400).json({errors: errors.array()})

}
const note = new Note({
   title, description, tag, user: req.user.id
})
const savedNote = await note.save()
res.json(savedNote)

}catch(error){
console.error(error.message);
res.status(500).send("internal server Error");
}
   })



router.get('/fetchallnotes', fetchuser, async (req, res) => {
try{

   const notes = await Note.find({user : req.user.id});
   res.json(notes)
}catch(error){
console.error(error.message);
res.status(400).send("INTERNAL SERVER ERROR")
}

})




   router.put('/updatenote/:id', fetchuser, async(req, res) =>{
 const {title, description, tag} = req.body;
 const newNote = {};
 if(title){newNote.title = title};
if(description){newNote.description = description};
if(tag){newNote.tag = tag};

let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("NOT FOUND")}
if(note.user.toString() !== req.user.id){
   return res.stauts(401).send("NOT ALLOWED")
}
note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
res.json({note})

   })



router.get('/fetchallnotes', fetchuser, async (req, res) => {
try{

   const notes = await Note.find({user : req.user.id});
   res.json(notes)
}catch(error){
console.error(error.message);
res.status(400).send("INTERNAL SERVER ERROR")
}

})


router.delete('/deletenote/:id', fetchuser, async(req, res) =>{
   
  try{
     let note = await Note.findById(req.params.id);
     if(!note){return res.status(404).send("NOT FOUND")}
     if(note.user.toString() !== req.user.id){
        return res.stauts(401).send("NOT ALLOWED")
     }
     note = await Note.findByIdAndDelete(req.params.id)
     res.json({"Success": "NOT IS DELETED", note: note})
  }catch(error){
   console.error(error.message);
   res.status(400).send("INTERNAL SERVER ERROR")
   }
  
     })
  

module.exports = router