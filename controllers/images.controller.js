const Image = require('../models/images.model')

module.exports.getAllImages = async(req, res) => {
  try{
    const images = await Image.find().sort({date: -1})
    res.json(images)
  } catch(err) {
    res.status(500).json(err)
  }
}

module.exports.addImage = async (req, res) => {
  try{
    const image = new Image({
      title: req.body.title,
      imageUrl: `/${req.file.filename}`
    })
    await image.save()
    res.status(201).json(image)
  } catch(err) {
    console.log(err)
  }
}

module.exports.removeImage = async(req, res) => {
  try{
    await Image.deleteOne({_id: req.body.id})
    res.json({message: 'Image was deleted'})
  } catch(err) {
    res.status(500).json(err)
  }
}