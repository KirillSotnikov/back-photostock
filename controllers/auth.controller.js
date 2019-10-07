const bcrypt = require('bcrypt')

const { User, validate } = require('../database/models/user.model')
const {NotFoundError, WrongData} = require('../lib/errors')

module.exports.createUser = async (req, res, next) => {
  try{
    const {error} = validate(req.body);
  
    if(error) return res.status(400).send(error.details[0].message)
  
    let user  = await User.findOne({email: req.body.email})
    if (user) return res.status(409).json({message: 'Email is already exists!'})
    user = new User({
      name: req.body.name,
      label: req.body.filePath,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email
    })
  
  
    await user.save()
    res.json({
      status: 'success',
      data: user
    })
  } catch{
    next(new WrongData())
  }
}

module.exports.login = async (req, res, next) => {
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
    // res.send(err)
    next(new NotFoundError()) 
  }
}

module.exports.getUserByToken = async(req, res, next) => {
  try{
    const userId = req.user._id
    
    const user = await User.findById(userId)
      .select("-password")
    res.json({
      status: 'success',
      data: {user}
    })
  } catch{
    // throw new NotFoundError()
    next(new NotFoundError())
  }
}