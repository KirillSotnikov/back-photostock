const {model, Schema} = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const keys = require('../../keys')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'images'
    }
  ]
})

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, keys.myprivatekey)
  return token
}

const User = model('User', UserSchema)

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  }

  return Joi.validate(user, schema)
}

module.exports.User = User
module.exports.validate = validateUser