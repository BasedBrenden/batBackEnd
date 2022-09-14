var express = require('express');
var mongoDB = 'mongodb+srv://bthomas:bthomas@cluster0.nkamwxm.mongodb.net/?retryWrites=true&w=majority'
var mongoose = require('mongoose');
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});


const UserData = require('../models/documentSchema')
var router = express.Router();

/* GET home page. */

router.get('/', async(req,res, next) =>{
  const currentPosts = await UserData.findById("631fb302c065ac636b9c5f95", (err, data)=>{
    if(err) {return console.error(err)}
  })
  res.json(currentPosts)
  

})

/* PUT a new pokemon into the roster*/

router.put('/api/put', (req,res)=>{

  UserData.findById("631fb302c065ac636b9c5f95", (err, data)=>{
    res.header("Access-Control-Allow-Origin", "https://batbackend.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(err) {return console.error(err)}
    const testReq = req.body.newPokemon;
    data.Team.push(testReq)
  })

})

module.exports = router;
