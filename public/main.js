new SimpleBar(document.getElementById('message__col'));

$(document).ready(() => {
  const socket = io.connect()
  const getNikname = $('#nikname')
  const formNikname = $('#get-nikname')
  const messageCol = $('.message__col')
  const userName = $('.user-name')
  const userForm = $('.user-form')
  const userInput = $('.user-input')
  const messageList = $('.message__list')
  const usersName = $('#users')


  formNikname.submit((e) => {
    e.preventDefault()
    socket.emit('login', getNikname.val())
    getNikname.val('')
  })
  userForm.submit((e) => {
    e.preventDefault()
    socket.emit('messages', userInput.val())
    console.log(userInput.val(''));
  })

  // listening
  socket.on('login', (date) => {
    if (date.status === 'OK') {
      messageCol.removeClass('d-none')
      usersName.removeClass('d-none')
      userForm.removeClass('d-none')
      formNikname.addClass('d-none')
    }
  })

  socket.on('user', (users) => {
    usersName.html('')
    for (let i = 0; i < users.length; i++) {
      usersName.append(`<li class="user-name">${users[i]}</li>`)
    }
  })

  socket.on('new message', (message) => {
    const newMassege = `<li class="massage__item">${message.newMas}<span>${message.time}</span>
    </li>`
    messageList.append(newMassege)
  })

})