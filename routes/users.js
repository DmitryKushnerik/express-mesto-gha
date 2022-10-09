const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllUsers, getUserById, updateUserInfo, updateUserAvatar, getInfoAboutMe,
} = require('../controllers/users');
const { urlTemplate } = require('../utils/validation');

router.get('/', getAllUsers);

router.get('/me/', getInfoAboutMe);

router.patch('/me/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlTemplate),
  }),
}), updateUserAvatar);

module.exports = router;
