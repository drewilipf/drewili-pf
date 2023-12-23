const {Router} = require('express')
const filterCategoryHandler = require('../handlers/Product/filterCategoryHandler')
const filterPrice = require('../handlers/Product/filterPriceHandler')
const filterColorHandler = require('../handlers/Color/filterColorHandler')
const getFilterBrandHandler= require('../handlers/Product/getFilterBrandHandler')
const router = Router()

router.get('/category', filterCategoryHandler)
router.get('/price', filterPrice)
router.get("/color", filterColorHandler)
router.get("/brand", getFilterBrandHandler)

module.exports = router