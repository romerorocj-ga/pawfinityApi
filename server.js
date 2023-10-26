const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/users');

const SERVERDEVPORT = 4741;
const CLIENTDEVPORT = 5173;

mongoose.connect(process.env.DATABASE_URL);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${CLIENTDEVPORT}`,
  })
);

const PORT = process.env.PORT || SERVERDEVPORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.use('/users', require('./routes/users'));

const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/items', ensureLoggedIn, require('./routes/items'));
app.use('/orders', ensureLoggedIn, require('./routes/orders'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});

module.exports = app;
