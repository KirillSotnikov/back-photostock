const {model, Schema} = require('mongoose')

const imageSchema = new Schema({
  imageUrl: {
    type:String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  alt: {
    type: String,
    default: 'Image'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tags'
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  ],
  category_id: {
    type: Schema.Types.ObjectId,
    // required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('image', imageSchema)