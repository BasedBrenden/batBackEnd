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
  }).clone();
  res.json(currentPosts)
})


router.post('/eeee', async(req,res, next) =>{

  const username = req.body.userId
  const currentPostsaaa = await UserData.find({Username: username}, (err, data)=>{
    if(err) {return console.error(err)}
  }).clone();

  res.json(currentPostsaaa)

})


/* Post user sign-up/account creation*/
router.post("/sign-up", (req,res,next)=>{
  const user = new UserData({
    Username: req.body.username1,
  }).save(err=>{
    if(err){
      return next(err);
    }})
  res.send("please?")
})



/* Post a new pokemon into the roster*/

router.post('/addPoke', (req,res, next)=>{
  const newPokemonInfo ={
    pokeID: req.body.pokeID,
    pokeImage: req.body.pokeImage,
    pokeName: req.body.pokeName
  }

  UserData.find({Username: req.body.Username}, (err, data)=>{
    if(err) {return console.error(err)}
    data.Team.push(newPokemonInfo)
    data.save((err, updateD)=>{
      if(err) console.error(err)
    })
  }).clone();
})

/* Post: delete specific pokemon from team
*/

router.post('/apir/delete', (req,res)=>{

  UserData.findOneAndUpdate({_id: "631fb302c065ac636b9c5f95"}, {$pull:{ Team:{pokeID:req.body.id}}}, (err, removedIndex)=>{
    if(err)return console.log(err);

  })

  /*UserData.findById("631fb302c065ac636b9c5f95", (err, data)=>{
    if(err) {return console.error(err)}


  
    //remove from data, then save updated version to mongoDB
    //data.pull({Team:{pokeID: req.body}})
    data.save((err, updateD)=>{
      if(err) console.error(err)
    })

    
  })
  */
  res.send();
  

})

module.exports = router;
