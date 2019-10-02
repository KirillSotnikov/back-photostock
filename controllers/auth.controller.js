const bcrypt = require('bcrypt')

const { User, validate } = require('../database/models/user.model')
const {NotFoundError, WrongData} = require('../lib/errors')

module.exports.createUser = async (req, res) => {
  const {error} = validate(req.body);

  if(error) return res.status(400).send(error.details[0].message)

  let user  = await User.findOne({email: req.body.email})
  if (user) return res.status(409).json({message: 'Email is already exists!'})

  user = new User({
    name: req.body.name,
    password: await bcrypt.hash(req.body.password, 10),
    email: req.body.email
  })

  // user.password = await 

  await user.save()
  res.json({
    status: 'success',
    data: user
  })
}

module.exports.login = async (req, res) => {
  try{
    let user = await User.findOne({email: req.body.email})
  
    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
  
      if(isPasswordCorrect) {
        const token = user.generateAuthToken()
  
        res.json({
          status:'success',
          data: { token, user }
        })
      } else {
        throw new WrongData()
      }
    } else {
      throw new NotFoundError()
      // res.send(new NotFoundError())
    }
  } catch (err) {
    res.error(err)
  }
}

module.exports.getUserByToken = async(req, res) => {
  const userId = req.user._id
  
  const user = await User.findById(userId)
  res.json({
    status: 'success',
    data: {user}
  })
}