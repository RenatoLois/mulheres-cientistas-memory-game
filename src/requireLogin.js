import { Storage } from '/src/storage.js';


export function requireLogin() {
  const currentUserData = Storage.read('currentUser', true);
  const currentName = currentUserData?.username || null;

  if (!currentName) {
    const base = window.location.pathname.split('/').slice(0, 2).join('/');
    window.location.href = `${base}/view/pages/main.html`;
    throw new Error(""); 
  }
}
