const {Router} = require('express')
const filterCategoryHandler = require('../handlers/Product/filterCategoryHandler')
const router = Router()

router.get('/category', filterCategoryHandler)


module.exports = router