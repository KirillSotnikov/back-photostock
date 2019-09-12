const mongoose = require('mongoose')
const keys = require('../keys')


module.exports = function () {
  mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err))
}