const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9\-\._~:\/?#\[\]@!$&'()*+,;=]+\#?/),
  }),
}), createCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
