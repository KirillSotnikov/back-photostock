const {Router} = require('express')
const ctr = require('../controllers/comments.controller')
const accessMiddleware = require('../middleware/accessMiddleware')

const router = Router()

//- /api/comments

router.post('/', accessMiddleware, ctr.addComment)

module.exports = router