const {Router} = require('express')
const postProductsHandler = require('../handlers/postProductHandler')
const getProductsHandler = require('../handlers/getProductHandler')

const router = Router()

router.get("/", getProductsHandler)
router.post("/", postProductsHandler)

module.exports = router