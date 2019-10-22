const Chat = require('../database/models/chat.model')
const {User} = require('../database/models/user.model')
const {NotFoundError, UnauthorizedError, WrongParametersError, ForbiddenError} = require('../lib/errors')


module.exports.socketConnect = async (socket) => {

  socket.on('createChat', async ({name, user_id}) => {
    try{
      let chat = await Chat.findOne({name})

      const resultData = [];
      if(chat == null) {
        
        chat = new Chat({
          name
        })
        chat.users.push(user_id)
        // chat.messages.unshift(message)
        await chat.save()

      } else {
        
        chat.users.includes(user_id) ? false : chat.users.push(user_id)
        // chat.messages.unshift(message)
        await chat.save()

      }

      const newUser = await User.findById(user_id)

      let resultChat = await Chat
        .findOne({name})
        .populate('users')
        .populate('messages.user_id')

      socket.emit('chatCreated', {
        status: 'success',
        data: {resultChat}
      })

      socket.broadcast.emit('newUser', newUser);

    } catch (err){
      console.log(err)
      // next(new ForbiddenError())
    }
  })

  socket.on('addMessage', async ({name, user_id, message}) => {
    // console.log(data)
    try{
      
      const chat = await Chat.findOne({name})
      chat.messages.push(message)
      await chat.save()

      let resultChat = await Chat
        .findOne({name})
        .populate('users')
        .populate('messages.user_id')


      socket.broadcast.emit('messageAdded', {
        success: 'true',
        data: {
          // user,
          resultChat
        }
      })
      socket.emit('messageAdded', {
        success: 'true',
        data: {
          // user,
          resultChat
        }
      })
    } catch (err) {
      console.log(err)
    }
  })
}
