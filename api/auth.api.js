const { Router } = require('express')
const ctr = require('../controllers/auth.controller')
const upload = require('../middleware/upload')
const cloudStorage = require('../middleware/cloudStorage')
const FBadmin = require('../lib/fb-admin')

const router = Router()

const accessMiddleware = require('../middleware/accessMiddleware')


//- /api/auth/
router.post('/registration', FBadmin, upload.single('label'), cloudStorage.upload, ctr.createUser)

router.post('/login', ctr.login)

router.get('/get-user-by-token', accessMiddleware, ctr.getUserByToken)

module.exports = router