const {NotFoundError} = require('../lib/errors')

module.exports.getImageFile = async (req, res, next) => {
  try{
    let imageName = req.params.name
    let fileUpload = req.bucket.file('images/' + imageName)
  
    let fileData = await fileUpload.download()

    let file = fileData[0]
  
    res.send(file)
  } catch(err) {
    throw new NotFoundError()
  }
}