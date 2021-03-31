const express = require('express');
const router = express.Router({ mergeParams: true });
const bodyParser = require('body-parser');
const Mongodb = require('mongodb');
const newsModel = require('../models/news');
const MongoClient = Mongodb.MongoClient;
const mongoose = require('../config/mongoConnect');

const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/user');
let db;

// GETS  news form
router.get('/addnews', function (req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>",token)
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };
            
        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}
            
            res.render('addnews.ejs', {data: false});
            
        });
    });
});
// GETS shopping list FROM THE DATABASE
router.get('/getnews', function (req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>",token)
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };    
    //fetch news from db, below need to be modified
    MongoClient.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser:true}, function(err,client) {
        if(err) throw err;
        db = client.db('webApp');
        var slist;
        db.collection('news').find().toArray((err,data) => {
            if(err) throw err;
            console.log(data);
            
            res.render('newsEdit.ejs',{data});
            })
        })
    });
});
router.get('/allNews', function (req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>",token)
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };    
    //fetch news from db, below need to be modified
    MongoClient.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser:true}, function(err,client) {
        if(err) throw err;
        db = client.db('webApp');
        var slist;
        db.collection('news').find().toArray((err,data) => {
            if(err) throw err;
            console.log(data);
            res.json(data);
            })
        })
    });
});
//post news
router.post('/add', function(req, res, next) {

    const news = new newsModel(req.body);
    news.save( (err, status) => {   
      if(!err){
        console.log('News Post has been Saved!');
        //res.end();
      }else{
        console.log('Error'+err);
        res.json(err);
      }
    });
  
});
//update news
router.get('/edit/:id/:desc/:time/:title', function (req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>",token)
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    }; 
    console.log(req.params.id);
    console.log(req.params.desc)
    console.log(req.params.time)
    console.log(req.params.title)
    MongoClient.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser:true}, function(err,client) {
        if(err) throw err;
        db = client.db('webApp');
        var slist;
        db.collection('news').update({_id: new Mongodb.ObjectID(req.params.id.trim())}, {title: req.params.title, desc: req.params.desc, CreatedOn: req.params.time});
        /*db.collection('newsmodels').find().toArray((err,data) => {
            if(err) throw err;
            console.log(data);
            res.render('newsEdit.ejs',{data})
        })   */     
    })
    
})
});


//delete news
router.get('/delete/:id', function (req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>",token)
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    }; 
    console.log(req.params.id);
    MongoClient.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser:true}, function(err,client) {
        if(err) throw err;
        db = client.db('webApp');
        var slist;
        db.collection('news').deleteOne({_id: new Mongodb.ObjectID(req.params.id.trim())});
        db.collection('news').find().toArray((err,data) => {
            if(err) throw err;
            console.log(data);
            res.render('newsEdit.ejs',{data})
        })       
    })
})
});

module.exports = router;