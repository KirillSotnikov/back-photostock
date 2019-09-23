const {Router} = require('express')
const ctr = require('../controllers/storage.controller')
const FBadmin = require('../lib/fb-admin')

const router = Router()

//- /storage
router.get('/images/:name', FBadmin, ctr.getImageFile)

module.exports = router