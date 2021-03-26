var express = require('express');
//const Contact = require('../models/newsModel');
const mongoose = require('../models/mongo');
var router = express.Router();

function display(data, res){
  
  console.log(data);
    res.render('newsEdit', {data: data});
  
}
router.get('/', function (req, res) {
  const con = mongoose.createConnection('mongodb://localhost/newsdb', {useNewUrlParser: true, useUnifiedTopology: true});
  con.once('open', function(){
    con.db.collection("newsmodels", function(err, collection){
      collection.find({}).toArray(function(err, data){
        display(data, res);
      });
    });
  });

});


module.exports = router;
