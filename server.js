import http from 'http';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3001;

// Read the existing chat interface
const html = fs.readFileSync('./public/index.html');

// Create the HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

// Create the WebSocket server
const wss = new WebSocketServer({ server });

// Broadcast a message to all connected clients
function broadcast(message) {
  const data = JSON.stringify(message);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Handle new connections
wss.on('connection', (socket, req) => {
  const username = new URL(
    req.url,
    'http://localhost'
  ).searchParams.get('username');

  // Notify everyone that a user joined
  broadcast({
    type: 'system',
    text: `${username} joined`
  });

  // Handle incoming chat messages
  socket.on('message', (data) => {
    try {
      const { username, text } = JSON.parse(data.toString());

      broadcast({
        type: 'chat',
        username,
        text
      });
    } catch (error) {
      console.error('Invalid message received:', error.message);
    }
  });

  // Notify remaining clients when a user leaves
  socket.on('close', () => {
    broadcast({
      type: 'system',
      text: `${username} left`
    });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});
