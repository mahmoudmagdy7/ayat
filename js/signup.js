
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
      console.log('valid');
      document.querySelector('.email-validation').classList.remove('d-none')
    } else {
      adding()
    }

  }
}

signupBtn.addEventListener('click', addUser)


function clear() {
  inputMail.value = '';
  inputPassword.value = '';
}

// adding success
function adding() {
  console.log('signup');
  var user = {
    user_name: inputName.value,
    user_mail: inputMail.value,
    user_password: inputPassword.value,
  }
  clear()
  // adding user data to local storage
  users.push(user)
  localStorage.setItem('users_db', JSON.stringify(users))
  setInterval(function () { window.open('../index.html', '_self') }, 3000) // redirect to login page
  document.querySelector('.validate-text').classList.remove('d-none')
}


// if valid
inputMail.addEventListener('keyup', typing)
inputName.addEventListener('keyup', typing)
inputPassword.addEventListener('keyup', typing)

function typing() {
  inputMail.style.border = ' none '
  document.querySelector('.email-validation').innerHTML = 'البريد الالكتروني موجود بالفعل!'
  document.querySelector('.email-validation').classList.add('d-none')
}
