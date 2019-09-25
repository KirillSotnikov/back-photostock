const imagesRoutes = require('./images.api')
const storageRoutes = require('./storage.api')
const usersRoutes = require('./users.api')
const authRoutes = require('./auth.api')
const categoriesRoutes = require('./categories.api')


module.exports = function (server) {
  server.use('/api/images', imagesRoutes)

  server.use('/storage', storageRoutes)

  server.use('/api/users', usersRoutes)

  server.use('/api/auth', authRoutes)

  server.use('/api/categories', categoriesRoutes)
}