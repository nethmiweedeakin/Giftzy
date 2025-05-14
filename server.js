const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const connectDB = require('./db');
const routes = require('./routes');
const app = express();
const port = 3000;
const passport = require('./middlewares/passport');
const giftRoutes = require('./routes/giftRoutes');

app.use(express.json());

const cors = require('cors');
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


app.use('/gifts', giftRoutes); // This enables `/gifts`, `/gifts/add`, etc.

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
