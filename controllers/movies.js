const Movie = require('../models/movie');

const getUserMovies = async (req, res, next) => {
  const userId = req.user.payload;
  try {
    const movies = await Movie.find({ owner: userId });
    res.status(200).send(movies);
  } catch (error) {
    next(error);
  }
};

const createMovie = (req, res, next) => {
  const owner = req.user.payload;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbNail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbNail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => next(error));
};

const deleteMovie = async (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new Error();
      }
      return movie.remove()
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

module.exports = {
  getUserMovies, createMovie, deleteMovie,
};
