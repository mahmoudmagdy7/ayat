'use strict'
// Check if user is logged in 
if (localStorage.getItem('user_id') == null) { // if user id not found 
  window.open('../index.html', '_self')// redirect to login 
} else {
  document.body.classList.remove('d-none')
}

// Setting the variables
var userName = document.querySelector('h2 span'); // welcome message
var users = JSON.parse(localStorage.getItem('users_db')) // array of users
var logoutBtn = document.querySelector('.logoutBtn');


userName.innerHTML = `${users[JSON.parse(localStorage.getItem('user_id'))].user_name}` // shoe the welcome message with user name

logoutBtn.addEventListener('click', logout)

// logout function
function logout() {
  localStorage.removeItem('user_id'); // removing user id 
  window.open('../index.html', '_self') // redirect to login page
};

/*
api
http://api.alquran.cloud/v1/ayah/{{reference}}/{{edition}}
The Quran contains 6236 verses. With this endpoint, you can retrieve any of those verses.

Returns an ayah for a given edition.
{{reference}} here can be the ayah number or the surah:ayah. For instance, 262 or 2:255 will both get you Ayat Al Kursi
{{edition}} is an edition identifier. Example: en.asad for Muhammad Asad's english translation
*/
var surahApi
function getData() {
  var ayahNumber = Math.floor(Math.random() * 6236)

  surahApi = new XMLHttpRequest();

  surahApi.open('get', `https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar`)

  surahApi.send()

  surahApi.addEventListener('loadend', function () {
    var surahName = JSON.parse(surahApi.response).data.surah.name;
    var numberOfAyahs = JSON.parse(surahApi.response).data.surah.numberOfAyahs;
    document.querySelector('#ayah').innerHTML = JSON.parse(surahApi.response).data.text;
    document.querySelector('#ayahDetails').innerHTML = `[ ${surahName}   - الاية رقم :    ${numberOfAyahs} ]`;
  })
}
getData()
getNotification()
document.querySelector('.newAyah').addEventListener('click', getData)


// notification system
var surahNotification
function getNotification() {
  var ayahNumber = Math.floor(Math.random() * 6236)

  surahNotification = new XMLHttpRequest();

  surahNotification.open('get', `https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar`)
  surahNotification.send()
  surahNotification.addEventListener('loadend', function () {
    if (surahNotification.status == 200) {
      notification()
    } else {
      console.log(surahNotification.status);
    }
  })
}
getNotification()
setInterval(getNotification, 1200000);
// new notification method 
function notification() {
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      new Notification('ayat', {
        title: 'ayat notification',
        body: JSON.parse(surahNotification.response).data.text,
      })
    }
  })
}
