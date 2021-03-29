const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Mongodb = require('mongodb');
const newsModel = require('../newsModel');
const MongoClient = Mongodb.MongoClient;

const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('./User');
let db;

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

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
            
            res.render('addnews.ejs');
            
        });
    });
});


//post news
router.post('/add', function(req, res, next) {
    console.log(req.body);
    const news = new newsModel(req.body);
    news.save( (err, status) => {   
      if(!err){
        console.log('News Post has been Saved!');
        res.render('addnews');
      }else{
        console.log('Error'+err);
        res.json(err);
      }
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
        db = client.db('admin');
        var slist;
        db.collection('newsmodels').find().toArray((err,data) => {
            if(err) throw err;
            console.log(data);
            res.render('newsEdit.ejs',{data})
            })
        })
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
        db = client.db('admin');
        var slist;
        db.collection('newsmodels').update({_id: new Mongodb.ObjectID(req.params.id.trim())}, {inputTitle: req.params.title, inputDesc: req.params.desc, inputTime: req.params.time});
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
        db = client.db('admin');
        var slist;
        db.collection('newsmodels').deleteOne({_id: new Mongodb.ObjectID(req.params.id.trim())});
        db.collection('newsmodels').find().toArray((err,data) => {
            if(err) throw err;
            console.log(data);
            res.render('newsEdit.ejs',{data})
        })       
    })
})
});


 router.get('/logout', (req,res) => {
     localStorage.removeItem('authtoken');
     res.redirect('/');
 })

module.exports = router;