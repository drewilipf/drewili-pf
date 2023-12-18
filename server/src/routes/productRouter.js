const {Router} = require('express')
const postProductsHandler = require('../handlers/Product/postProductHandler')
const getProductsHandler = require('../handlers/Product/getProductHandler')
const putProductsHandler= require('../handlers/Product/putProductHandler')

const router = Router()

router.get("/", getProductsHandler)
router.post("/", postProductsHandler)
router.put("/:id", putProductsHandler)

module.exports = router