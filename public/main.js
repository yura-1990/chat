new SimpleBar(document.getElementById('message__col'));

$(document).ready(() => {
  const socket = io.connect()
  const getNikname = $('#get-nikname #nikname')
  const formNikname = $('#get-nikname')
  const messageCol = $('.message__col')
  const userName = $('.user-name')
  const userForm = $('.user-form')
  const userInput = $('.user-input')
  const messageList = $('.message__list')

  formNikname.submit((e) => {
    e.preventDefault()
    socket.emit('login', {
      nik: getNikname.val(),
      status: ''
    })
    getNikname.val('')
  })
  userForm.submit((e) => {
    e.preventDefault()
    socket.emit('message', {
      message: userInput.val(),
      date: new Date()
    })
    userInput.val('')
  })

  socket.on('login', (data) => {
    if (data.status === 'OK') {
      messageCol.removeClass('d-none');
      userName.removeClass('d-none');
      userForm.removeClass('d-none');
      formNikname.addClass('d-none')
      userName.html(data.nik)
    }
  })

  socket.on('message', (data) => {
    const showMsg = `<li class="massage__item">${data.newMsg} <span>${data.date}</span>
    </li>`
    messageList.append(showMsg)
  })


})