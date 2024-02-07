document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, firstname, lastname, password }),
    });
  
    if (response.ok) {
      console.log('Signup successful');
    } else {
      console.log('Signup failed');
    }
  });
  