import {Storage} from '/src/storage.js';

const form = document.querySelector('.start-form');

const nameInput = document.getElementById('username');

const currentUser = Storage.read('currentUser', true);
if(currentUser !== null) {
  nameInput.value = currentUser['username'];
}

nameInput.addEventListener('input', function() {
  this.value = this.value.replace(/[!@#$%¨&*()<>:;\/|\\?\]\[{}]/g, '');
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('username').value;

  Storage.write('currentUser', {'username': name}, true);

  const base = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
  window.location.href = `${base}/view/pages/dashboard.html`;
});
