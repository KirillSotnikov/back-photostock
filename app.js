const express = require('express')
const app = express()

const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const api = require('./api')
const connectDB = require('./database')
const corsOptions = require('./middleware/cors')
const cors = require('cors')
const errorsMiddlwere = require('./middleware/errors');

// const {http} = require('./api/socket.api')

const http = require('http').createServer(app);

const io = require('socket.io')(http);
const {socketConnect} = require('./controllers/socket.controller')


app.use(morgan('dev'))
// corsOptions(app)
app.use(cors({origin: 'http://localhost:3000'}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))

app.use(express.static(path.join(__dirname)))



api(app)



connectDB()

// FBadmin()

// app.route('/', FBadmin)

// io.on('connection', function(socket){
//   console.log('a user connected');

//   socket.on('someEvent', data => {
//     console.log(data)
//     setTimeout(() => {
//       socket.emit('responseSS', `You are cool, and your message is - "${data}"`)
//     }, 1000)
//   })
  
// });

io.on('connection', function(socket){
  console.log('user connected')

  socketConnect(socket)
});


app.use(errorsMiddlwere)

const server = http.listen(process.env.PORT || 3000, function() {
  console.log('Server is satated on port: ' + server.address().port)
})