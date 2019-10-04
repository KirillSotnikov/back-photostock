const {Router} = require('express')
const ctr = require('../controllers/images.controller')
const commentsController = require('../controllers/comments.controller')
const upload = require('../middleware/upload')
const cloudStorage = require('../middleware/cloudStorage')
const FBadmin = require('../lib/fb-admin')
const accessMiddleware = require('../middleware/accessMiddleware')

const router = Router()

//- /api/images/

router.get('/', ctr.getAllImages)

router.post('/', accessMiddleware, FBadmin, upload.single('image'), cloudStorage.upload, ctr.addImage)

router.delete('/', ctr.removeImage)

router.get('/:id', ctr.getImageById)

router.get('/:id/comments', commentsController.getCommentByImageId)


module.exports = router