const express = require("express");
const router = express.Router();
const Preferences = require("../models/preferences.model.js");

router.param('id', function(req,res,next, id){
   const modified = id;
   req.id = modified;
   next();
})
router.get('/Preferences', async (req, res) => {
  try{
    const preferences = await Preferences.find();
    res.send({data: preferences});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.get('/Preferences/user/:id', async (req, res) => {
  try{
    const preferences = await Preferences.find({receivers: req.params.id});
    res.send({data: preferences});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.patch('/Preference/:id', async (req,res) => {
  try{
    const preference = Preferences.findById(req.params.id);
    const ind = preference.receivers.indexOf(req.body.userId);
    const newReceivers = [...preference.splice(ind,1)];
    const body = {
      receivers: newReceivers,
    };
    await Preferences.findByIdAndUpdate(req.params.id, body);
  }catch(err){
    res.status(400).json({message: err.message});
  }
});


router.post('/Preferences', async (req,res) => {
  const preference = new Preferences ({
    senderId: req.body.senderId,
    senderUsername: req.body.senderUsername,
    movies: req.body.movies,
    receivers: req.body.receivers,
    seen: false,
  })
  try{
    const newPreference = await preference.save()
    res.status(201).json(newPreference);
  }catch(err){
    res.status(400).json({message: err.message});
  }
})

router.delete('/Preferences/:id', async (req,res) => {
  try{
    await Preferences.findByIdAndDelete(req.params.id);
    res.status(200).json();
  }catch(err){
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
