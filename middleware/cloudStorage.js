const moment = require('moment')

exports.upload = async (req, res, next) => {
  let file = req.file;

  if(!file) {
    res.status(500);
    res.json('file not found');
    return;
  }
  let fileUpload = req.bucket.file(`${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
  /*
  req.bucket.upload("assets/avatar/5ce7f5c25958b012805bb4f3_Logo-100-1.jpg").then(   //<-- if we have to upload local file, pass path of that file
  */
  // Get File from request Form data.
  let filePath = await fileUpload.save(new Buffer.from(file.buffer)).then(  
    result => {
      return result
    },
    error => {
      res.status(500);
      console.log(error);
      res.json({error: error});
    }
  );
  const config = {
    action: 'read',
    expires: '03-17-2025'
  };
  let fileURL = fileUpload.getSignedUrl(config, function(err, url) {
    if (err) {
      console.error(err);
      return;
    }
  
    // The file is now available to read from this URL.
    request(url, function(err, resp) {
      // resp.statusCode = 200
    });
  });
};