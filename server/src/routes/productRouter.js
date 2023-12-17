const {Router} = require('express')
const postProductsHandler = require('../handlers/Product/postProductHandler')
const getProductsHandler = require('../handlers/Product/getProductHandler')

const router = Router()

router.get("/", getProductsHandler)
router.post("/", postProductsHandler)

module.exports = router