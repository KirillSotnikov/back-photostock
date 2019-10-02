const bcrypt = require('bcrypt')
const { User, validate } = require('../database/models/user.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')

module.exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find()
    res.json({
      status: 'success',
      data: {users}
    })
  } catch (err) {
    throw new NotFoundError()
  }
}

module.exports.getUserById = async (req, res) => {
  try {
    await User
      .findById(req.params.id)
      .select("-password")
      .populate('images')
      .exec(function(err, user) {
        res.json({
          status: 'success',
          data: {user}
        })
      })
  } catch (err){
    // console.log(err)
    throw new NotFoundError()
  }
}