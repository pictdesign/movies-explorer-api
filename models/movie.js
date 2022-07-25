const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = new Schema({
  country: {
    type: 'string',
    required: true,
  },
  director: {
    type: 'string',
    required: true,
  },
  duration: {
    type: 'number',
    required: true,
  },
  year: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  image: {
    type: 'string',
    required: true,
  },
  trailerLink: {
    type: 'string',
    required: true,
  },
  thumbNail: {
    type: 'string',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: 'string',
    required: true,
  },
  nameRU: {
    type: 'string',
    required: true,
  },
  nameEN: {
    type: 'string',
    required: true,
  },
});

module.exports = mongoose.model('movie', MovieSchema);
