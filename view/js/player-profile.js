import { Storage } from '/src/storage.js';
import { PlayerModel } from '/src/playerModel.js';
import { requireLogin } from '/src/requireLogin.js';


requireLogin();

const currentUserData = Storage.read('currentUser', true);
const currentName = currentUserData?.username || null;

const p = new PlayerModel(currentName);

document.getElementById('profile-name').textContent = p.name;
document.getElementById('stat-points').textContent = p.points;
document.getElementById('stat-matches').textContent = p.matches;
document.getElementById('stat-tries').textContent = p.tries;
document.getElementById('stat-accuracy').textContent = `${(p.accuracy * 100).toFixed(0)}%`;

function renderIcon() {
  const iconContainer = document.getElementById('profile-icon-container');
  if (iconContainer) {
    iconContainer.innerHTML = ''; 
    const iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid', p.iconFaName);
    iconContainer.appendChild(iconElement);
  }
}

const changeIconBtn = document.getElementById('change-icon-btn');
changeIconBtn.addEventListener('click', () => {
  p.changeToRandomIcon();
  PlayerModel.updatePlayer(p);
  renderIcon();
});

PlayerModel.updatePlayer(p);
renderIcon();


