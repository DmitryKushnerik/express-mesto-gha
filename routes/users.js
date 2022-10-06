const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllUsers, getUserById, updateUserInfo, updateUserAvatar, getInfoAboutMe,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.get('/me/', getInfoAboutMe);

router.patch('/me/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9\-\._~:\/?#\[\]@!$&'()*+,;=]+\#?/),
  }),
}), updateUserAvatar);

module.exports = router;
