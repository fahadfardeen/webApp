var express = require('express');
const newsModel = require('../models/newsModel');
var router = express.Router();

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

module.exports = router;
