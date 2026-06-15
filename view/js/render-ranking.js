import { Storage } from '/mulheres-cientistas-memory-game/src/storage.js';

const rankingList = document.getElementById('ranking-list');
const tabPoints = document.getElementById('tab-points');
const tabAccuracy = document.getElementById('tab-accuracy');

let currentCriteria = 'points'; 

function getAccuracy(player) {
  const tries = player.tries || 0;
  const matches = player.matches || 0;
  return tries > 0 ? matches / tries : 0;
}

function loadPlayersFromStorage() {
  const allPlayers = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('player_')) {
      const playerData = Storage.read(key, true);
      if (playerData) {
        allPlayers.push(playerData);
      }
    }
  }
  return allPlayers;
}

function renderRanking() {
  if (!rankingList) return;
  rankingList.innerHTML = '';

  const allPlayers = loadPlayersFromStorage();

  if (allPlayers.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.classList.add('ranking-empty');
    rankingList.appendChild(emptyLi);
    return;
  }

  const sortedPlayers = allPlayers.sort((a, b) => {
    if (currentCriteria === 'points') {
      const pointsDiff = (b.points || 0) - (a.points || 0);
      if (pointsDiff !== 0) return pointsDiff;
      return getAccuracy(b) - getAccuracy(a); 
    } else {
      const accuracyDiff = getAccuracy(b) - getAccuracy(a);
      if (accuracyDiff !== 0) return accuracyDiff;
      return (b.points || 0) - (a.points || 0); 
    }
  });

  const top10 = sortedPlayers.slice(0, 10);

  top10.forEach((player, index) => {
    const li = document.createElement('li');
    li.classList.add('ranking-item');

    if (index < 3) {
      li.classList.add(`podium-${index + 1}`);
    }

    let displayValue = '';
    if (currentCriteria === 'points') {
      displayValue = `${player.points || 0} pts`;
    } else {
      displayValue = `${(getAccuracy(player) * 100).toFixed(0)}%`;
    }

    const playerIcon = player.iconFaName || 'fa-user';

    li.innerHTML = `
      <span class="ranking-position">${index + 1}°</span>
      <div class="ranking-player-info">
        <i class="fa-solid ${playerIcon} ranking-avatar"></i>
        <span class="ranking-name">${player.name}</span>
      </div>
      <span class="ranking-value">${displayValue}</span>
    `;

    rankingList.appendChild(li);
  });
}

function changeTab(criteria, activeTab, inactiveTab) {
  if (currentCriteria === criteria) return;
  currentCriteria = criteria;
  activeTab.classList.add('active');
  inactiveTab.classList.remove('active');
  renderRanking();
}

if (tabPoints && tabAccuracy) {
  tabPoints.addEventListener('click', () => changeTab('points', tabPoints, tabAccuracy));
  tabAccuracy.addEventListener('click', () => changeTab('accuracy', tabAccuracy, tabPoints));
}

renderRanking();
