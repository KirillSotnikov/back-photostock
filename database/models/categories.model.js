const {model, Schema} = require('mongoose')

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'images'
    }
  ]
})

module.exports = model('category', categorySchema)