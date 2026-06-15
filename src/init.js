import {Storage} from '/src/storage.js';

const darkmode = Storage.read('darkmode');

if(darkmode === null) {
  Storage.write('darkmode', {'enabled': 'true'});
  document.body.classList.toggle('dark');
} else {
  if(darkmode['enabled'] === 'true') {
    document.body.classList.toggle('dark');
  }
}
