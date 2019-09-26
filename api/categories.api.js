const accessMiddleware = require('../middleware/accessMiddleware')
const {Router} = require('express')
const ctr = require('../controllers/categories.controller')

const router = Router()

const keys = require('../keys')

//- /api/categories

router.get('/', ctr.getAllCategories)

router.post('/', accessMiddleware, ctr.createCategory)

router.get('/:id', ctr.getCategoryById)

module.exports = router