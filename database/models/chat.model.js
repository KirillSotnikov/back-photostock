const {model, Schema} = require('mongoose')

const chatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  messages: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('chats', chatSchema)