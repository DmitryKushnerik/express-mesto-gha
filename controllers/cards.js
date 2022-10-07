const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (String(card.owner) !== String(req.user._id)) {
        return next(new ForbiddenError('У пользователя нет прав на это действие'));
      }

      Card.findByIdAndRemove(req.params.cardId)
        .then((delCard) => res.send({ data: delCard }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(ValidationError('Передан некорректный _id карточки'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      return next(err);
    });
};
