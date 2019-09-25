const {model, Schema} = require('mongoose')

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  }
})

module.exports = model('category', categorySchema)