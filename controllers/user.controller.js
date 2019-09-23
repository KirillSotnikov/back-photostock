const bcrypt = require('bcrypt')
const { User, validate } = require('../database/models/user.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user)
  } catch {
    throw new NotFoundError()
  }
}
