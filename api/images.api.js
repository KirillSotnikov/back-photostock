const {Router} = require('express')
const ctr = require('../controllers/images.controller')
const upload = require('../middleware/upload')
const cloudStorage = require('../middleware/cloudStorage')
const FBadmin = require('../lib/fb-admin')

const router = Router()

//- /api/images/

router.get('/', ctr.getAllImages)

router.post('/', FBadmin, upload.single('image'), cloudStorage.upload, ctr.addImage)

router.delete('/', ctr.removeImage)


module.exports = router