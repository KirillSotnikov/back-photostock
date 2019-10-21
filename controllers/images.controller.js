const Image = require('../database/models/images.model')
const {User} = require('../database/models/user.model')
const Category = require('../database/models/categories.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')

module.exports.getAllImages = async(req, res, next) => {
  try{

    let filterData = {}

    if (undefined !== req.query.user_id) filterData.user_id = req.query.user_id
    if (undefined !== req.query.category_id) filterData.category_id = req.query.category_id
    
    const images = await Image
      .find(filterData)
      .sort({created_at: -1})
    res.json({
      status: 'success',
      data: images ,
      total: images.length
    })
  } catch {
    // throw new NotFoundError()
    next(new NotFoundError())
  }
}

module.exports.addImage = async (req, res, next) => {
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
    // throw new WrongParametersError()
    next(new WrongParametersError())
    // console.log(err)
  }
}

module.exports.removeImage = async(req, res, next) => {
  try{
    await Image.deleteOne({_id: req.body.id})
    res.json({
      status: 'success',
      message: 'Image was deleted'
    })
  } catch(err) {
    // throw new WrongParametersError()
    next(new WrongParametersError())
  }
}

module.exports.getImageById = async (req, res, next) => {
  try {
    await Image
      .findOne({_id: req.params.id})
      // .populate('comments')
      .exec((error, image) => {
        res.json({
          status: 'success',
          data: {image}
        })
      })
    // res.json({
    //   status: 'success',
    //   data: {image}
    // })
  } catch {
    // throw new NotFoundError()
    next(new NotFoundError())
  }
}
