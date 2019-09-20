const imagesRoutes = require('./images.api')
const storageRoutes = require('./storage.api')


module.exports = function (server) {
  server.use('/api/images', imagesRoutes)

  server.use('/storage', storageRoutes)
}