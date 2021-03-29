var express = require('express');
const newsModel = require('../models/newsModel');
var router = express.Router();
const mongoose = require('../models/mongo');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NewsForm' });
});
//router.delete from the delete button does not work yet, please wait to use the delete and edit buttons until I've finished them
router.post('/add', function(req, res, next) {
  console.log(req.body);
  const news = new newsModel(req.body);
  news.save( (err, status) => {   
    if(!err){
      console.log('News Post has been Saved!');
      res.render('index', { title: 'Express' });
    }else{
      console.log('Error'+err);
      res.json(err);
    }
  });

});
router.get("/allNews", function(req, res) {
  const con = mongoose.createConnection('mongodb://localhost/newsdb', {useNewUrlParser: true, useUnifiedTopology: true});
  con.once('open', function(){
    con.db.collection("newsmodels", function(err, collection){
      collection.find({}).toArray(function(err, data){
          res.json(data);
      });
    });
  });
});
router.get('/test', function(req, res, next) {
  console.log(req.body);
  res.render("../views/test");
});


module.exports = router;
