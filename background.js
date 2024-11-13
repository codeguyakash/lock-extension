let locked = false;  // Track if the profile is locked
let password = 'roottoor';  // Store the password

// Store the password in chrome storage if it's set by the user
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('password', (data) => {
    if (data.password) {
      password = data.password;
    }
  });
});

// Listen for tab changes or events to lock/unlock
chrome.tabs.onCreated.addListener((tab) => {
  if (locked && tab.url !== 'chrome://settings/') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showPasswordPrompt,
    });
  }
});

function showPasswordPrompt() {
  const userPassword = prompt('Enter your password to unlock the profile:');
  if (userPassword === password) {
    chrome.runtime.sendMessage({ action: 'unlock' });
  } else {
    alert('Incorrect password!');
    window.close(); // Close the tab to block access
  }
}
