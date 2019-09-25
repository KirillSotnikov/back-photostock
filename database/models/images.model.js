const {model, Schema} = require('mongoose')

const imageSchema = new Schema({
  title: {
    type: String
  },
  imageUrl: {
    type:String,
    required: true
  },
  description: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('image', imageSchema)