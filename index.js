const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);
const path = require('path')
const users = []
const message = []
app.use(express.static(path.join(__dirname + '/public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('login', (data) => {
    const foundUser = users.find((user) => {
      return user.nik === data.nik
    })
    if (!foundUser) {
      users.push(data)
      io.sockets.emit('login', {
        nik: data.nik,
        status: 'OK'
      })
    } else {
      io.sockets.emit('login', {
        nik: data.nik,
        status: 'FAILD'
      })
    }
  })
  
  socket.on('message',(data)=>{
    message.push(data)
    io.sockets.emit('message', {
      newMsg: data.message,
      date: data.date
    })
  })
  
  
  
  
  
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});