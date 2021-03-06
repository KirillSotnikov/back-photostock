const accessMiddleware = require('../middleware/accessMiddleware')
const {Router} = require('express')
const ctr = require('../controllers/categories.controller')
const upload = require('../middleware/upload')
const cloudStorage = require('../middleware/cloudStorage')
const FBadmin = require('../lib/fb-admin')

const router = Router()

const keys = require('../keys')

//- /api/categories

router.get('/', ctr.getAllCategories)

router.post('/', accessMiddleware, FBadmin, upload.single('label'), cloudStorage.upload, ctr.createCategory)

router.get('/:id', ctr.getCategoryById)

module.exports = router