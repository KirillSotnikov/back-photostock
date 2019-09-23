const express = require('express')
const app = express()

const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const api = require('./api')
const connectDB = require('./database')
const corsOptions = require('./middleware/cors')
const cors = require('cors')



app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))

app.use(express.static(path.join(__dirname)))


api(app)

corsOptions(app)

connectDB()

// FBadmin()

// app.route('/', FBadmin)



const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server is satated on port: ' + server.address().port)
})