const {Router} = require('express')
const filterCategoryHandler = require('../handlers/Product/filterCategoryHandler')
const getFilterBrandHandler= require('../handlers/Product/getFilterBrandHandler')
const router = Router()

router.get('/category', filterCategoryHandler)
router.get("/brand", getFilterBrandHandler)


module.exports = router