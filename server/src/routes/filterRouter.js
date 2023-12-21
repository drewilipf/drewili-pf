const {Router} = require('express')
const filterCategoryHandler = require('../handlers/Product/filterCategoryHandler')
const filterPrice = require('../handlers/Product/filterPriceHandler')
const filterColorHandler = require('../handlers/Color/filterColorHandler')
const router = Router()

router.get('/category', filterCategoryHandler)
router.get('/price', filterPrice)
router.get("/color", filterColorHandler)


module.exports = router