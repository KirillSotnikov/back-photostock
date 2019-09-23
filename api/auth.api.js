const { Router } = require('express')
const ctr = require('../controllers/auth.controller')

const router = Router()


//- /api/auth/
router.post('/registrate', ctr.createUser)

router.post('/login', ctr.login)

module.exports = router