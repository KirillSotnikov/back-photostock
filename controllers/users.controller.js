const bcrypt = require('bcrypt')
const { User, validate } = require('../database/models/user.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')


module.exports.getUserById = async (req, res) => {
  try {
    await User
      .findById(req.user._id)
      .select("-password")
      .populate('images')
      .exec(function(err, user) {
        res.json({
          status: 'success',
          data: {user}
        })
      })
  } catch {
    throw new NotFoundError()
  }
}
