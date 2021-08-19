const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
let users = []
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('login', (data) => {
    const found = users.find((user) => {
      return data === user
    })
    console.log(found);
    if (!found) {
      users.push(data)
      socket.nikName = data
      io.sockets.emit('user', users)
      socket.emit('login', { status: 'OK' })
    } else {
      socket.emit('login', { status: 'FAILED' })
    }

  })

  socket.on('messages', (mes) => {
    io.sockets.emit('new message', {
      newMas:mes,
      time: new Date()
    })
  })


})



http.listen(3000, () => {
  console.log('Server is working . . .');
})