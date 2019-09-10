const {model, Schema} = require('mongoose')

const imageSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type:String,
    required: true
  }
})

module.exports = model('image', imageSchema)