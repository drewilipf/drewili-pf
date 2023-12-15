const {Router} = require('express')
const postProductsHandler = require('../handlers/postProductHandler')
const getProductsHandler = require('../handlers/getProductHandler')

const router = Router()

router.get("/products", getProductsHandler)
router.post("/products", postProductsHandler)

module.exports = router