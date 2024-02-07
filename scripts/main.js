// main.js

// Connect to the server
const socket = io();

// Get references to DOM elements
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');

// Handle 'message' event from server
socket.on('message', (message) => {
  // Create a new div element
  const div = document.createElement('div');

  // Set the text content
  div.textContent = message;

  // Add the message to the container
  messageContainer.appendChild(div);
});

// Listen for form submission
messageForm.addEventListener('submit', (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the message from the input
  const message = messageInput.value;

  // Emit 'chatMessage' event to server
  socket.emit('chatMessage', message);

  // Clear the input
  messageInput.value = '';
});

function joinRoom(room) {
  socket.emit('joinRoom', { username: 'test', room });
}

function leaveRoom(room) {
  socket.emit('leaveRoom', { username: 'test', room });
}

// Handle signup form submission
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

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    console.log('Login successful');
  } else {
    console.log('Login failed');
  }
});
