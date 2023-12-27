const {Router} = require('express')
const getSalesCartHandler = require('../handlers/SalesCart/getSalesCartHandler')
const salesCartDeleteHandler = require('../handlers/SalesCart/deleteSalesCardHandler')
const addToSalesCartHandler = require('../handlers/SalesCart/addToSalesCart')


const router = Router()

router.get("/user/:userId", getSalesCartHandler)
router.post("/addToSalesCart", addToSalesCartHandler)
router.delete("/:id", salesCartDeleteHandler)

module.exports = router