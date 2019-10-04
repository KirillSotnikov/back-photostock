const {model, Schema} = require('mongoose')

const commentsSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  image_id: {
    type: Schema.Types.ObjectId
  }
})

module.exports = model('comments', commentsSchema)