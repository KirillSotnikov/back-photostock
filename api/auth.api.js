const { Router } = require('express')
const ctr = require('../controllers/auth.controller')

const router = Router()

const accessMiddleware = require('../middleware/accessMiddleware')


//- /api/auth/
router.post('/registration', ctr.createUser)

router.post('/login', ctr.login)

router.get('/get-user-by-token', accessMiddleware, ctr.getUserByToken)

module.exports = router