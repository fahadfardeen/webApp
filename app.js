const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis'); // npm i redis
const axios = require('axios').default;


app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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