const path = require('path')
const multer = require('multer')
const momment = require('moment')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../', 'upload'))
  },
  filename(req, file, cb){
    cb(null, `${momment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})