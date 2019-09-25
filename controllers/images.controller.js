const Image = require('../database/models/images.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')

module.exports.getAllImages = async(req, res) => {
  try{
    const images = await Image.find().sort({created_at: -1})
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
    const image = new Image({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.filePath,
      creared_at: new Date().toLocaleString()
    })
    await image.save()
    res.json({
      status: 'success',
      data: image
    })
  } catch(err) {
    throw new UnauthorizedError()
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