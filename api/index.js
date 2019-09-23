const imagesRoutes = require('./images.api')
const storageRoutes = require('./storage.api')
const userRoutes = require('./users.api')
const authRoutes = require('./auth.api')


module.exports = function (server) {
  server.use('/api/images', imagesRoutes)

  server.use('/storage', storageRoutes)

  server.use('/api/user', userRoutes)

  server.use('/api/auth', authRoutes)
}