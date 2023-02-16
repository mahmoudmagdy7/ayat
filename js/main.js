'use strict'

// login page
var users = JSON.parse(localStorage.getItem('users_db')) // getting users array
// setting inputs 
var inputMail = document.getElementById('mail'),
  inputPassword = document.getElementById('password'),
  // getting login button
  loginBtn = document.querySelector('.loginBtn')

// login function start
loginBtn.addEventListener('click', () => {
  if (localStorage.getItem('users_db') == null) {
    loginBtn.style.opacity = '0.6'
    inputMail.style.border = ' solid red 1px  '
    inputPassword.style.border = ' solid red 1px  '
    document.querySelector('.validate-text').classList.remove('d-none') // show validate message
  } else{
    login()
  }
})

var userMach; // getting user id 
function login() {
  if (inputMail.value == '' || inputPassword == '') {
    document.querySelector('.validate-text').classList.remove('d-none') // show validate message
  } else {
    if (check()) {
      window.open('./pages/home.html', "_self") // redirect user to home page
    } else {
      loginBtn.style.opacity = '0.6'
      inputMail.style.border = ' solid red 1px  '
      inputPassword.style.border = ' solid red 1px  '
      document.querySelector('.validate-text').classList.remove('d-none') // show validate message
    }
  }
}


function check() {

  for (var i = 0; i < users.length; i++) {
    if (inputMail.value == users[i].user_mail && inputPassword.value == users[i].user_password) { // validate the data
      userMach = i;
      localStorage.setItem('user_id', JSON.stringify(userMach)) // setting user id in the local storage
      return true
    }
  }
}
// remove validate message if user start writing
inputMail.addEventListener('keyup', typing)
inputPassword.addEventListener('keyup', typing)

function typing() {
  loginBtn.style.opacity = '1'

  inputMail.style.border = ' none '
  inputPassword.style.border = ' none '

  document.querySelector('.validate-text').classList.add('d-none')
}

// redirect user if already in
if (localStorage.getItem('user_id') != null) {
  window.open('./pages/home.html', '_self')
}