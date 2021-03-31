var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
var cors = require('cors');
router.use(cors());

 
 //Contact: should receive two form fields, email and query
router.post('/', function (req, res, next) {
    console.log('email' + req.body);
    console.log("IN CONTACT POST");
    let sendgridAPIKey = 'test';
    sgMail.setApiKey(sendgridAPIKey);
    tempObj = {
        to: req.body.email,
        from: 'husseinsiad01@gmail.com',
        subject: 'Thank you for contacting us',
        text: 
        "Hello, \nThank you for contacting us. We will get back to your shortly.\n------------------------------\nPlease do not reply to this automated message.\n--Update 24x7 Team"
    }
    sgMail.send(tempObj)
    res.status(200).json({msg: "email sent"});
});

module.exports = router;