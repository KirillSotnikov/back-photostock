const Chat = require('../database/models/chat.model')
const {NotFoundError, UnauthorizedError, WrongParametersError, ForbiddenError} = require('../lib/errors')


module.exports.socketConnect = async (socket, next) => {

  socket.on('createChat', async data => {
    try{
      const chat = new Chat()
      chat.users.unshift(data._id)
      await chat.save()

      socket.emit('chatCreated', {
        status: 'success',
        data: ''
      })
    } catch {
      next(new ForbiddenError())
    }
  })

}
