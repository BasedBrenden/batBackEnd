var express = require('express');
var mongoDB = 'mongodb+srv://bthomas:bthomas@cluster0.nkamwxm.mongodb.net/?retryWrites=true&w=majority'
var mongoose = require('mongoose');
const app = require('../app');
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const UserData = require('../models/documentSchema')
var router = express.Router();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    UserData.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  UserData.findById(id, function(err, user) {
    done(err, user);
  });
});

router.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.urlencoded({ extended: false }));






/* GET home page. */

router.get('/', async(req,res, next) =>{
  const currentPosts = await UserData.findById("631fb302c065ac636b9c5f95", (err, data)=>{
    if(err) {return console.error(err)}
  }).clone();
  res.json(currentPosts)

})


/* Post user sign-up/account creation*/
router.post("/sign-up", (req,res,next)=>{
  const pleaseJustUpdate = {
    username: req.body.username,
    password: req.body.password

  }
  const user = new UserData({
    Settings: {
      DarkMode: true,
      Callsign: pleaseJustUpdate.username,
      Phrase: pleaseJustUpdate.password
    }
  });
 


  user.save(err =>{
    if (err) {
      return next(err);
    }
    res.json(user);
  })
})



/* Post a new pokemon into the roster*/

router.post('/apir', (req,res, next)=>{
  const newPokemonInfo ={
    pokeID: req.body.pokeID,
    pokeImage: req.body.pokeImage,
    pokeName: req.body.pokeName
  }
  
  UserData.findById("631fb302c065ac636b9c5f95", (err, data)=>{
    if(err) {return console.error(err)}
  
    data.Team.push(newPokemonInfo)
    data.save((err, updateD)=>{
      if(err) console.error(err)
    })

    
  })
  
  res.send();
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
