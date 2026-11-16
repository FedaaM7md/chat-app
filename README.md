# Chat App

A real-time chat application built with Node.js and WebSockets. Users join with a username, see who enters and leaves the room, and exchange messages that are broadcast instantly to everyone connected.

> freeCodeCamp Build a Chat App Certification Project, part of the **Back End Development and APIs** curriculum.

## Features

- Real-time messaging over WebSockets using the [`ws`](https://www.npmjs.com/package/ws) library.
- System notifications when a user joins or leaves.
- Chat messages are broadcast to every connected client.
- A single HTTP server on port **3001** serves the chat page and handles WebSocket upgrades.

## How It Works

1. `http.createServer` serves `public/index.html` for regular HTTP requests.
2. A `WebSocketServer` is attached to the same HTTP server, so WebSocket connections also use port 3001.
3. On each `connection`, the server reads the username from the `?username=` query parameter and broadcasts a join message.
4. Each incoming `message` is parsed as JSON (`{ username, text }`) and broadcast to all clients with an open connection.
5. On `close`, the server broadcasts that the user left.

## WebSocket Messages

Connect to:

```
ws://localhost:3001/?username=YourName
```

Send a chat message:

```json
{"username":"YourName","text":"Hello everyone"}
```

Messages broadcast by the server:

```json
{"type":"system","text":"YourName joined"}
{"type":"chat","username":"YourName","text":"Hello everyone"}
{"type":"system","text":"YourName left"}
```

## Installation

Requires Node.js 18 or later.

```bash
git clone https://github.com/FedaaM7md/chat-app.git
cd chat-app
npm install
```

## Running

```bash
npm start
```

Open `http://localhost:3001` in two browser tabs, enter different usernames, and start chatting.

## Project Structure

| Path | Purpose |
|---|---|
| `server.js` | HTTP server and WebSocket chat logic |
| `public/index.html` | Chat user interface |
| `public/script.js` | Browser-side WebSocket client |
| `package.json` / `package-lock.json` | Dependencies (`ws`) and scripts |

## Technologies

- Node.js (ES Modules, built-in `http` and `fs`)
- ws (WebSocket server)
- HTML, CSS and JavaScript

## Author

Fedaa Mohamed ([@FedaaM7md](https://github.com/FedaaM7md))
