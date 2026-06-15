import {UrlValues} from '/src/urlValues.js';

let mode = UrlValues.get('mode');
if (mode == null) {
  const base = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
  window.location.href = `${base}/view/pages/main.html`;
} else {
  let difficulty = UrlValues.get('difficulty');
  if(difficulty === null) {
    window.location.href = `/view/pages/game.html?mode=${mode}&difficulty=${difficulty}`;
  } else {
    
  }
}
