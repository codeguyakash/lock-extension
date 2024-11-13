document.getElementById('set-password').addEventListener('click', () => {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword) {
      chrome.storage.local.set({ password: password }, () => {
        alert('Password set successfully!');
      });
    } else {
      alert('Passwords do not match!');
    }
  });
