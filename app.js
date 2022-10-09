const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { /* celebrate, Joi, */ errors } = require('celebrate');
const routes = require('./routes/index');
/* const NotFoundError = require('./errors/NotFoundError');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { urlTemplate } = require('./utils/validation'); */
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
