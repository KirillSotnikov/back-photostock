const accessMiddleware = require('../middleware/accessMiddleware')
const { Router } = require('express')
const ctr = require('../controllers/users.controller')

const router = Router()

const keys = require('../keys')

//- /api/users/

router.get('/', ctr.getAllUsers)

router.get('/:id', ctr.getUserById)
// router.get('/:id', accessMiddleware, ctr.getUserById)

module.exports = router