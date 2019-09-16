const express = require('express')
const app = express()

const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const api = require('./api')
const connectDB = require('./database')
const cors = require('./middleware/cors')



app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}))

app.use(express.static(path.join(__dirname)))


api(app)

cors(app)

connectDB()

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server is satated on port: ' + server.address().port)
})