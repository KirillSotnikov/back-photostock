const moment = require('moment')

exports.upload = async (req, res, next) => {
  let file = req.file;
  if(!file) {
    res.status(500);
    res.json('file not found');
    return;
  }

  let filePath = `images/${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`

  let fileUpload = req.bucket.file(filePath)
  
  await fileUpload.save(new Buffer.from(file.buffer)).then(  
    result => {
      return result
    },
    error => {
      res.status(500);
      res.json({error: error});
    }
  );

  req.body.filePath = filePath

  next()
};