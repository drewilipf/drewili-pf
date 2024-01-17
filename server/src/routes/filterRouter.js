const {Router} = require('express')
const filterCategoryHandler = require('../handlers/Product/filterCategoryHandler')
const filterPrice = require('../handlers/Product/filterPriceHandler')
const filterColorHandler = require('../handlers/Color/filterColorHandler')
const getFilterBrandHandler= require('../handlers/Product/getFilterBrandHandler')
const filterHandler = require('../handlers/filterHandler')
const router = Router()

router.use((req, res, next) => {
    
    next();
  });
router.get('/category', filterCategoryHandler)
router.get('/price', filterPrice)
router.get("/color", filterColorHandler)
router.get("/brand", getFilterBrandHandler)
router.get('/filter', filterHandler)

module.exports = router