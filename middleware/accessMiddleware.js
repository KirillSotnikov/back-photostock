const jwt = require('jsonwebtoken')
const keys = require('../keys')

const {UnauthorizedError, WrongParametersError} = require('../lib/errors')

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"]

  if(!token) {
    throw new UnauthorizedError()
  }

  try {
    const decoded = jwt.verify(token, keys.myprivatekey)
    req.user = decoded
    next()
  } catch(err) {
    // throw new WrongParametersError()
    res.json({message: 'Wrong password or email'})
  }
}