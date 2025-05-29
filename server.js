const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const connectDB = require('./db');
const routes = require('./routes');
const passport = require('./middlewares/passport');
const cors = require('cors');
const http = require('http'); // Needed to create server for Socket.IO
const socketIo = require('socket.io');
const validateEnv = require('./helpers/validateEnv');
const secretAngelSocket = require("./sockets/secretAngelSocket");
const likeNotificationSocket = require("./sockets/likeNotificationSocket");
const eventReminderSocker = require("./sockets/eventReminderSocket");
validateEnv();

//for Quiz Admin
const quizAdminRoutes = require('./routes/quizAdminRoutes');

const app = express();
const port = 3000;

app.use(express.json());


app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(passport.initialize());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

connectDB();


app.use('/', routes);


const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  likeNotificationSocket(io, socket);
  secretAngelSocket(io, socket);
});

app.set('socketio', io);

module.exports = { app, server, io };


if (require.main === module) {
  server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
}
//QuizAdmin
app.use('/quizAdmin', quizAdminRoutes);
s
app.get('/student-id', (req, res) => {
  res.send('Student ID: 123456789');
});


