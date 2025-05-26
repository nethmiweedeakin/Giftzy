const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const connectDB = require('./db');
const routes = require('./routes');
const app = express();
const port = 3000;
const passport = require('./middlewares/passport');
const { Server } = require('socket.io');
const { setupSocket } = require('./socket/chat');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

app.use(express.json());

const cors = require('cors');
app.use(cookieParser());
const session = require('express-session');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "Secure_Secret_Key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: false
  }
});

// Use it in Express

app.use(sessionMiddleware,
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// Pass it to Socket.IO
const server = http.createServer(app);
const io = new Server(server);

app.use(passport.initialize());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use('/', routes);

// === Socket.IO Setup (in socket/chat.js) ===
setupSocket(io, sessionMiddleware);
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
