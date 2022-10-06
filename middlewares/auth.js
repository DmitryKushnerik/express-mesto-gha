const jwt = require('jsonwebtoken');
const AuthorisationError = require('../utils/AuthorisationError');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthorisationError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      throw new AuthorisationError('Необходима авторизация');
    }

    req.user = payload; // записываем пейлоуд в объект запроса
    next(); // пропускаем запрос дальше
  } catch (err) {
    next(err);
  }
};
