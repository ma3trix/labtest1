const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));


// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Use session middleware
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Use auth routes in your application
app.use('/auth', authRoutes);

// Set up a basic route
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/chat.html');
  });
  

// Set up socket.io connection
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    socket.to(room).emit('message', `${username} has joined the room`);
  });

  socket.on('leaveRoom', ({ username, room }) => {
    socket.leave(room);
    socket.to(room).emit('message', `${username} has left the room`);
  });

  socket.on('chatMessage', async ({ username, room, message }) => {
    console.log(`Message from ${username} in ${room}: ${message}`);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
