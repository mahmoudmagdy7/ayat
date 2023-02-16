'use strict'
// sign up page
var users = [];
var signupBtn = document.querySelector('.signupBtn');

// inputs value
var inputName = document.getElementById('name'),
  inputMail = document.getElementById('mail'),
  inputPassword = document.getElementById('password')

//check if users arr is not empty
if (localStorage.getItem('users_db') != null) {
  users = JSON.parse(localStorage.getItem('users_db'))
}



// creating function to add new user
function addUser() {
  // getting user data
  if (inputName.value == '' || inputMail.value == '' || inputPassword.value == '') {
    document.querySelector('.email-validation').innerHTML = 'جميع الحقول مطلوبه !'
    document.querySelector('.email-validation').classList.remove('d-none')
  }
  else {
    function check() {
      for (var i = 0; i < users.length; i++) {
        if (users[i].user_mail == inputMail.value) {
          return true;
        }
      }
    }
    if (check()) {
      document.querySelector('.email-validation').classList.remove('d-none')
      inputMail.style.border = ' solid red 1px  '
    } else {
      adding()
    }
  }
}

signupBtn.addEventListener('click', addUser)

// clear the form
function clear() {
  inputMail.value = '';
  inputPassword.value = '';
}
// check if mail is valid in the pattern
function isValid() {
  let regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/g
  let mailValidation = inputMail.value.trim()
  return regEx.test(mailValidation)
}
// adding success
function adding() {
  // mail pattern
  if (isValid() == true) {
    var user = {
      user_name: inputName.value.toLowerCase(),
      user_mail: inputMail.value.toLowerCase(),
      user_password: inputPassword.value,
    }
    clear()
    // adding user data to local storage
    users.push(user)
    localStorage.setItem('users_db', JSON.stringify(users))
    setInterval(function () { window.open('../index.html', '_self') }, 3000) // redirect to login page
    document.querySelector('.validate-text').classList.remove('d-none')
  } 
}


// if valid
inputMail.addEventListener('keyup', () => {
  typing()
  // mail validation //
  if (inputMail.value != '') {
    document.querySelector('.correct-mail').classList.remove('d-none')
    if (isValid()) {
      document.querySelector('.correct-mail').classList.add('correct')
      document.querySelector('.correct-mail').innerHTML = 'بريد الكتروني مسموح به '
    } else {
      document.querySelector('.correct-mail').innerHTML = '- من فضلك ادخل بريد الكتروني صحيح'
      document.querySelector('.correct-mail').classList.remove('correct')
    }
  } else {
    document.querySelector('.correct-mail').classList.add('d-none');
  }
})
inputName.addEventListener('keyup', typing)
inputPassword.addEventListener('keyup', typing)
// remove warning
function typing() {
  inputMail.style.border = ' none '
  document.querySelector('.email-validation').innerHTML = 'البريد الالكتروني موجود بالفعل!'
  document.querySelector('.email-validation').classList.add('d-none')
}

