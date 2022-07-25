const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

UserSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error();
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error();
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', UserSchema);
