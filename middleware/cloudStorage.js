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
  /*
  req.bucket.upload("assets/avatar/5ce7f5c25958b012805bb4f3_Logo-100-1.jpg").then(   //<-- if we have to upload local file, pass path of that file
  */
  // Get File from request Form data.
  await fileUpload.save(new Buffer.from(file.buffer)).then(  
    result => {
      return result
    },
    error => {
      res.status(500);
      console.log(error);
      res.json({error: error});
    }
  );

  req.body.filePath = filePath

  next()
};