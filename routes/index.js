var express = require('express');
var mongoDB = 'mongodb+srv://bthomas:bthomas@cluster0.nkamwxm.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const Posts = require('body-parser');
router.use(bodyParser.json());

const UserData = require('../models/documentSchema')
var router = express.Router();

/* GET home page. */

router.get('/', async(req,res, next) =>{
  const currentPosts = await Posts.findById("62e965869ada8f801e5443ea", (err, data)=>{
    if(err) {return console.error(err)}
  }).clone()
  res.json(currentPosts)

})

module.exports = router;
