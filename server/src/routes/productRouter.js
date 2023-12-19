const {Router} = require('express')
const postProductsHandler = require('../handlers/Product/postProductHandler')
const getProductsHandler = require('../handlers/Product/getProductHandler')
const productSoftDeleteHandler = require('../handlers/Product/deleteProductHandler')

const router = Router()

router.get("/", getProductsHandler)
router.post("/", postProductsHandler)
router.put("/:id", productSoftDeleteHandler)


module.exports = router