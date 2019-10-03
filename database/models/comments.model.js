const {model, Schema} = require('mongoose')

const commentsSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId
  },
  image_id: {
    type: Schema.Types.ObjectId
  }
})

module.exports = model('comments', commentsSchema)