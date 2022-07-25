const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { isUrl } = require('validator');
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');

const router = express.Router();

router.get('/', getUserMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isUrl),
    trailerLink: Joi.string().required().custom(isUrl),
    thumbNail: Joi.string().required().custom(isUrl),
    owner: Joi.string().required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEn: Joi.string().required(),

  }),
}), createMovie);

router.delete('/:id', deleteMovie);

module.exports = router;
