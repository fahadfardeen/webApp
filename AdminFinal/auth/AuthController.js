const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const app = express();
// For parsing form
const bodyParser = require('body-parser');
// For generating Token
const jwt = require('jsonwebtoken');
// For encrypting Password
const bcrypt = require('bcryptjs');
// For Secert Token
const config = require('../config/config');
// For User Schema
const User = require('../models/user');

const session = require('express-session');
//not sure yet
router.use(session({secret: 'edurekaSecert1', resave: false, saveUninitialized: true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Register User
router.post('/register', function(req, res) {
  
  User.create()
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log(req.body.username, req.body.email);
    User.create({
      username : req.body.username,
      email: req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      console.log(err);
      console.log(user)
      if (err){
        console.log(err);
        console.log(user)
        res.send(err);
      } 
      // create a token for user
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      //testing with postman
      //res.status(200).send({auth:true, token: token});
      const string = encodeURIComponent('Successfully register');
      res.redirect('/?msg=' + string);
    }); 
  });

  // Login User
router.post('/login', function(req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        console.log('username'+user);
      if (err) return res.status(500).send('Error on the server.');
      const string = encodeURIComponent('! Please enter valid value');
      if (!user) { res.redirect('/?valid=' + string);}
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        localStorage.setItem('authtoken', token)
        res.redirect('/news/addnews');
        
        
      }
    });
});

// Info of logined User
router.get('/loginedUser', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // res.status(200).send(decoded);
      User.findById(decoded.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
    });
  });

  module.exports = router;