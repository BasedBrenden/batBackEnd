var express = require('express');
var mongoDB = 'mongodb+srv://bthomas:bthomas@cluster0.nkamwxm.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const UserData = require('../models/documentSchema')
var router = express.Router();

/* GET home page. */

router.get('/', function(req,res, next){
  Posts.findById("631fb302c065ac636b9c5f95", (err, data)=>{
    res.header("Access-Control-Allow-Origin", "https://batfe.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send("HAH! GOTEM!")
    
    if(err) {return console.error(err)}
    /*
    const newPost = {
      public:true,
      image: req.body.image,
      title: req.body.title,
      blogPost: req.body.blogPost,
      comments: [],
      //new dates dont appear to be saving in DB but are showing in client front-end.
      date: new Date(),
    }*/
    

    //data.posts.push(newPost)

    //data.save((err,updatedData)=>{
    //  if(err) console.error(err)
    //})
  }).clone()
  res.send("Lol what?");

})

module.exports = router;
