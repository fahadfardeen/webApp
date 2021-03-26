const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Mongodb = require('mongodb');
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

// GETS shopping list FROM THE DATABASE
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
            console.log('>>>>>><<<<<< up to here')

            res.render('addnews.ejs');
            /*MongoClient.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser:true}, function(err,client) {
                if(err) throw err;
                db = client.db('admin');
                var slist;
                db.collection('shoppinglist').find().toArray((err,result) => {
                    if(err) throw err;
                    console.log(result);
                    res.render('shoppinglist.ejs',{result})
                })

               
            //res.render('shoppinglist.ejs',{slist})
            })*/


            //db = MongoClient.db('admin')
            //var slist = db.collection('shoppinglist').find().toArray();
            //console.log(slist);
            //res.render('shoppinglist.ejs',{slist})
            //res.render('shoppinglist.ejs',{user})
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
        
     
        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}
            console.log('>>>>>><<<<<< up to here')

            //fetch news from db, below need to be modified
            MongoClient.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser:true}, function(err,client) {
                if(err) throw err;
                db = client.db('admin');
                var slist;
                db.collection('users').find().toArray((err,result) => {
                    if(err) throw err;
                    console.log(result);
                    res.render('userlist.ejs',{result})
                })
            })
        });
    });
});

 router.get('/logout', (req,res) => {
     localStorage.removeItem('authtoken');
     res.redirect('/');
 })

module.exports = router;