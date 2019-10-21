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
        chat.users.unshift(user_id)
        // chat.messages.unshift(message)
        await chat.save()

      } else {
        
        chat.users.includes(user_id) ? false : chat.users.unshift(user_id)
        // chat.messages.unshift(message)
        await chat.save()

        const newUser = await User.findById(user_id)

        resultData.push(newUser)
      }

      let resultChat = await Chat
        .findOne({name})
        .populate('users')
      

      resultData.push(resultChat)
      socket.emit('chatCreated', {
        status: 'success',
        data: {resultData}
      })

    } catch (err){
      console.log(err)
      // next(new ForbiddenError())
    }
  })

  socket.on('addMessage', async() => {
    
  })
}
