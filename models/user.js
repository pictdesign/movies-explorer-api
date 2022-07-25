const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: 'string',
    required: true,
    unique: true,
    validate: [validator.isEmail],
  },
  password: {
    type: 'string',
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: 'string',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', UserSchema);
