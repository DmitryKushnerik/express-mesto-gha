const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NotFoundError = require('./utils/NotFoundError');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

/* app.use((req, res, next) => {
  req.user = {
    _id: '633046fc0112f6a3e9f48dbb',
  };
  next();
}); */
app.post('/signin', login);
app.post('/signup', createUser);

// auth();
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => {
  const err = new NotFoundError('Запрошенный URL не найден');
  next(err);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = err;
  res.status(statusCode).send({ message });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
