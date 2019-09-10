const express = require('express')
const app = express()

const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./keys')

const imagesRoutes = require('./routes/images.routes')



app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}))

app.use(express.static(path.join(__dirname)))

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err))

app.use('/api/images', imagesRoutes)

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server is satated on port: ' + server.address().port)
})