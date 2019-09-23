const bcrypt = require('bcrypt')

const { User, validate } = require('../database/models/user.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')

module.exports.createUser = async (req, res) => {
  const {error} = validate(req.body);

  if(error) return res.status(400).send(error.details[0].message)

  let user  = await User.findOne({email: req.body.email})
  if (user) return res.status(409).json({message: 'Email is already exists!'})

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  })

  user.password = await bcrypt.hash(user.password, 10)

  await user.save()
  res.json({
    status: 'success',
    data: user
  })
}

module.exports.login = async (req, res) => {
  let user = await User.findOne({email: req.body.email})

  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)

    if(isPasswordCorrect) {
      const token = user.generateAuthToken()

      res.json({
        status:'success',
        data: { token }
      })
    } else {
      throw new WrongParametersError()
    }
  } else {
    throw new NotFoundError()
  }
}