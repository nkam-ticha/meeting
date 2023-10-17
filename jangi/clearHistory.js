import { storedPassword}from './login.js'

function clearHistory() {
  historyTableBody.innerHTML = '';
  localStorage.setItem('historyData', JSON.stringify([]));
}

const clearBtn = document.getElementById('clearHistory');

// it will ask you to confirm a password before actually clearing the history

clearBtn.addEventListener('click', () => {

  const password = prompt('Enter admin password to confirm:', '');

  if(password === storedPassword) {
    // Clear history
      
    clearHistory();

  } else {
    alert('Incorrect password');
  }

});