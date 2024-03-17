const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = 3001;
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // For generating unique room IDs

const rooms = {};
const disconnectedUsers = {};
const answers = {};
// Initialize a new instance of socket.io by passing the HTTP server object
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Listen for incoming connections
io.on('connection', (socket) => {
  console.log('A user connected');
  console.log(socket.id);

  socket.on('create game', () => {
    const roomID = uuidv4(); // Generate a unique room ID
    socket.join(roomID); // Join the creator to the room
    socket.emit('game created', roomID); // Send back the room ID to the creator
  });

  socket.on('room exists', (roomID) => {
    const room = io.sockets.adapter.rooms.get(roomID);
    if (room) {
      socket.emit('true');
    } else {
      delete rooms[roomID];
      delete answers[roomID];
      socket.emit('error joining', 'Room does not exist');
    }
  });

  // Handler for joining an existing game room
  socket.on('join game', ({ roomId, user }) => {
    console.log('message', roomId, user);
    if (roomId !== undefined && user !== undefined) {
      if (!rooms[roomId]) {
        rooms[roomId] = {};
        answers[roomId] = [];
      }
      if (disconnectedUsers[user]) {
        clearTimeout(disconnectedUsers[user].timer);
        delete disconnectedUsers[user];
        console.log(
          'Reconnection detected, cancellation of removal for user: ' + user
        );
      }
      rooms[roomId][user] = 0;
      socket.join(roomId);
      socket.username = user;
      socket.roomId = roomId;
      socket.emit('joined game', roomId); // Confirm joining
      // Optionally notify others in the room
      socket.in(roomId).emit('player joined', socket.id);
      io.in(roomId).emit('users', rooms[roomId]);
      io.in(roomId).emit('display answer', answers[roomId]);
    }
  });

  socket.on('get users', (room) => {
    if (rooms[room]) {
      io.in(room).emit('users', rooms[room]);
    }
  });

  socket.on('score increased', ({ user, room }) => {
    rooms[room][user]++;
    answers[room].push(`${user}: Answered Correct!`);
    io.in(room).emit('users', rooms[room]);
    io.in(room).emit('display answer', answers[room]);
  });

  socket.on('display guess', ({ user, room, response }) => {
    answers[room].push(`${user}: ${response}`);
    io.in(room).emit('display answer', answers[room]);
  });

  socket.on('disconnect', () => {
    const { username, roomId } = socket;
    if (rooms[roomId]) {
      // Schedule removal only if the user is not already marked for removal
      if (!disconnectedUsers[username]) {
        console.log('Disconnected: ' + username + ' ' + roomId);
        disconnectedUsers[username] = {
          timer: setTimeout(() => {
            // Remove user after delay
            console.log(rooms);
            if (rooms[roomId]) {
              delete rooms[roomId][username];
              socket.in(roomId).emit('users', rooms[roomId]);
              delete disconnectedUsers[username];
              console.log('User removed after timeout: ' + username);
            }
          }, 30000), // 30-second delay
        };
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
