const imagesApi = require('./images.api')
const storageApi = require('./storage.api')
const usersApi = require('./users.api')
const authApi = require('./auth.api')
const categoriesApi = require('./categories.api')
const commentsApi = require('./comments.api')


module.exports = function (server) {
  server.use('/api/images', imagesApi)

  server.use('/storage', storageApi)

  server.use('/api/users', usersApi)

  server.use('/api/auth', authApi)

  server.use('/api/categories', categoriesApi)

  server.use('/api/comments', commentsApi)
}