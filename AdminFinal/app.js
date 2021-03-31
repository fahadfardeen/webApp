var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var cors = require('cors');
app.use(cors());
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
var AuthController = require('./auth/AuthController');
var contactRouter = require('./routes/contact');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/api/auth', AuthController);
app.use('/contact', contactRouter);

const port = 3001;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]

  }
});

http.listen(port, "127.0.0.1", () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    console.log(msg);
    io.emit('message-broadcast', msg);
  });
});
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;