var express = require('express');
const news = require('../models/newsModel');
const mongoose = require('../models/mongo');
var router = express.Router();

function findUsers(res){
    const con = mongoose.createConnection('mongodb://localhost/newsdb', {useNewUrlParser: true, useUnifiedTopology: true});
    con.once('open', function(){
      con.db.collection("newsmodels", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data);
            res.render('newsEdit', {data: data});
        });
      });
    });
}
router.get('/', function (req, res) {
    findUsers(res);
});
router.get('/delete/:id', function(req, res, next) {
    console.log(req.params.id);
    news.findByIdAndRemove( req.params.id.trim(), (err, status) => {
        if(!err){
            console.log("News Deleted");
            console.log(status);
            findUsers(res);
        }
        else{
            res.json(err)
        }
    })
  });
  router.get('/edit/:id/:desc/:time/:title', function(req, res, next) {
    console.log(req.params);
    news.findByIdAndUpdate( req.params.id.trim(), {inputTitle: req.params.title, inputDesc: req.params.desc, inputTime: req.params.time}, (err, status) => {
        if(!err){
            console.log("News updated");
            console.log(status);
            findUsers(res);
        }
        else{
            res.json(err)
        }
    })
  });


module.exports = router;
