const auth = require('../middleware/auth')
const { Router } = require('express')
const ctr = require('../controllers/user.controller')

const router = Router()

const keys = require('../keys')

//- /api/user/

router.get('/:id', auth, ctr.getUserById)

module.exports = router