import { Storage } from '/src/storage.js';


export function requireLogin() {
  const currentUserData = Storage.read('currentUser', true);
  const currentName = currentUserData?.username || null;

  if (!currentName) {
    window.location.href = '/view/pages/main.html';
    throw new Error(""); 
  }
}
