const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = 3001;
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // For generating unique room IDs

const rooms = {};
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
      socket.emit('error joining', 'Room does not exist');
    }
  });

  // Handler for joining an existing game room
  socket.on('join game', ({ roomId, user }) => {
    console.log('message', roomId, user);
    if (!rooms[roomId]) {
      rooms[roomId] = new Set([]);
    }
    rooms[roomId].add(user);
    socket.join(roomId);
    socket.emit('joined game', roomId); // Confirm joining
    // Optionally notify others in the room
    socket.in(roomId).emit('player joined', socket.id);
    socket.in(roomId).emit('users', [...rooms[roomId]]);
    console.log(rooms);
  });

  socket.on('get users', (room) => {
    if (rooms[room]) {
      socket.emit('users', [...rooms[room]]);
    }
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
