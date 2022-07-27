const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');

const router = express.Router();

const checkUrl = (value, helper) => {
  if (isURL(value)) {
    return value;
  }
  return helper.message('Некорректная ссылка');
};

router.get('/', getUserMovies);

router.post('/', createMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkUrl),
    trailerLink: Joi.string().required().custom(checkUrl),
    thumbNail: Joi.string().required().custom(checkUrl),
    owner: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
