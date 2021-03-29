const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis'); // npm i redis
const axios = require('axios').default;


app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});


io.on('connection', (socket) => {
  console.log('New User connected');

  // attaching listener to the emitted event
  socket.on('chat', (data) => {
    // Chat message received
    console.log(data);

    // Let's send chat message to all connected socket clients.
    let payload = {
      message: data.chatMsg,
      nickName: data.nickName
    };

    socket.emit('newChat', payload);
    socket.broadcast.emit('newChat', payload);
  });

});




http.listen(3000, () => {
  console.log('listening on *:3000');
});




/*
//const express = require('express');
//const app = express();
const request = require('request');

const url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=5&appid=4f560fc5cdfc6d59dac359cad2050bd7";

app.get('/weather', (req, res) => {
    request(url, (err, response, body) => {
        if (err) {
            console.log(err);
        } else {
            const output = JSON.parse(body);
            res.send(output);
        }
    });
})

function getWeather(url) {
    var options = {
        url: weatherUrl,
        headers: {
            'User-Agent': 'request'
        }
    };
    return new Promise(function (resolve, reject) {
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

app.get('/weather', (req,res) => {
    var dataPromise = getWeather();
    dataPromise.then(JSON.parse)
                .then(function(result) {
                    res.render('weather', {result,title:'Weather App'})
                })
})

app.listen(port, (err) => {
    if(err) { console.log('error in api call')}
    else{ console.log('App is running on port '+port)}
})

app.use(express.static(__direname+'/public/weather'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

*/