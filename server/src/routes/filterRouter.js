const {Router} = require('express')
const filterCategoryHandler = require('../handlers/Product/filterCategoryHandler')
const filterPrice = require('../handlers/Product/filterPriceHandler')
const router = Router()

router.get('/category', filterCategoryHandler)
router.get('/price', filterPrice)


module.exports = router