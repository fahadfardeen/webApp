var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
var cors = require('cors');
router.use(cors());

 
 //Contact: should receive two form fields, email and query
router.post('/', function (req, res, next) {
    console.log("IN CONTACT POST");
    let sendgridAPIKey = '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';
    sgMail.setApiKey(sendgridAPIKey);
    tempObj = {
        to: req.body.email,
        from: 'eng.husseinsiad@gmail.com',
        subject: 'Thank you for contacting us',
        text: 
        "Hello, \nThank you for contacting us. We will get back to your shortly. Your query was: \n------------------------------\n${req.body.query}\n------------------------------\nPlease do not reply to this automated message.\n--Update 24x7 Team"
    }
    sgMail.send(tempObj)
    res.status(200).json({msg: "email sent", content:tempObj});
});

module.exports = router;