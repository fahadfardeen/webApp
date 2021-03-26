const app = require('./app');
const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));

app.set('view engine','ejs');
app.set('views', './views');

app.get('/',(req, res) => {
    //sess = req.session;
    //sess.username = " "
    //console.log('>>>>>', sess.username);
    res.render('index', {error: req.query.valid?req.query.valid:'', msg: req.query.msg?req.query.msg:''})
})

app.get('/signup', (req,res) => {
    res.render('signup');
})

const server = app.listen(port, () => {
    console.log('Express server listening on port '+port);
});