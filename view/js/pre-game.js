import { requireLogin } from '/mulheres-cientistas-memory-game/src/requireLogin.js';
import { UrlValues } from '/mulheres-cientistas-memory-game/src/urlValues.js'


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
    window.location.href = `/mulheres-cientistas-memory-game/view/pages/game.html?mode=${mode}&difficulty=${difficulty}`;
  });
});
