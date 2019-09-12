const imagesRoutes = require('./images.api')


module.exports = function (server) {
  server.use('/api/images', imagesRoutes)
}