const {Router} = require('express')
const sortByPriceHandler = require('../handlers/Product/sortByPriceHandler')

const router = Router()

router.get("/price", sortByPriceHandler)


module.exports = router