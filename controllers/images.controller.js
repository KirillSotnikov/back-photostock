const Image = require('../database/models/images.model')
const {User} = require('../database/models/user.model')
const Category = require('../database/models/categories.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')
const open = require('open')

module.exports.getAllImages = async(req, res) => {
  try{

    let filterData = {}

    if (undefined !== req.query.user_id) filterData.user_id = req.query.user_id
    if (undefined !== req.query.category_id) filterData.category_id = req.query.category_id

    await open('https://google.com', {app: 'google chrome'});
    console.log(2)
    
    const images = await Image
      .find(filterData)
      .sort({created_at: -1})
    res.json({
      status: 'success',
      data: images ,
      total: images.length
    })
  } catch(err) {
    throw new NotFoundError()
  }
}

module.exports.addImage = async (req, res) => {
  try{
    let userID = req.user._id
    let categoryID = req.body.category_id

    const image = new Image({
      imageUrl: req.body.filePath,
      title: req.body.title,
      description: req.body.description || '',
      alt: req.body.alt,
      user_id: userID,
      tags: req.body.tags || [],
      category_id: categoryID,
      // creared_at: new Date().toLocaleString(),
    })
    await image.save()
    
    const user = await User.findOne({_id:userID})
    await user.images.unshift(image._id)
    await user.save()

    const category = await Category.findOne({_id: categoryID})
    await category.images.unshift(image._id)
    await category.save()

    res.json({
      status: 'success',
      data: image
    })
  } catch(err) {
    throw new WrongParametersError()
    // console.log(err)
  }
}

module.exports.removeImage = async(req, res) => {
  try{
    await Image.deleteOne({_id: req.body.id})
    res.json({
      status: 'success',
      message: 'Image was deleted'
    })
  } catch(err) {
    throw new WrongParametersError()
  }
}

module.exports.getImageById = async (req, res) => {
  try {
    const image = await Image
      .findOne({_id: req.params.id})
    res.json({
      status: 'success',
      data: {image}
    })
  } catch (err) {
    throw new NotFoundError()
  }
}