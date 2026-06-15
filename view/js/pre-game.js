import { requireLogin } from '/src/requireLogin.js';
import { UrlValues } from '/src/urlValues.js'


requireLogin();

const mode = UrlValues.get('mode');
if (mode == null) {
  window.location.href = '/view/pages/main.html';
  throw new Error('');
}

const buttons = document.querySelectorAll('.btn-diff');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const difficulty = button.getAttribute('data-difficulty');
    window.location.href = `/view/pages/game.html?mode=${mode}&difficulty=${difficulty}`;
  });
});
