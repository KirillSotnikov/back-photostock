const {Router} = require('express')
const ctr = require('../controllers/images.controller')
const upload = require('../middleware/upload')

const router = Router()

//- /api/images/

router.get('/', ctr.getAllImages)

router.post('/', upload.single('image'), ctr.addImage)

router.delete('/', ctr.removeImage)

module.exports = router