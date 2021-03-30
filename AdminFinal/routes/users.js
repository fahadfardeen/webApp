const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/user');

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});
 router.get('/logout', (req,res) => {
     localStorage.removeItem('authtoken');
     res.redirect('/');
 })


module.exports = router;