const {NotFoundError} = require('../lib/errors')

module.exports.getImageFile = async (req, res, next) => {
  try{
    let imageName = req.params.name
    let fileUpload = req.bucket.file('images/' + imageName)
  
    fileUpload.download().then(function(data) {
      const file = data[0];
  
      res.send(file)
    });
  } catch(err) {
    throw new NotFoundError()
  }
}