const {Router} = require('express')
const getSalesCartHandler = require('../handlers/SalesCart/getSalesCartHandler')
const salesCartDeleteHandler = require('../handlers/SalesCart/deleteSalesCardHandler')
const addToSalesCartHandler = require('../handlers/SalesCart/addToSalesCart')
const putSalesCartHandler = require('../handlers/SalesCart/putSalesCartHandler')


const router = Router()

router.get("/user/:userId", getSalesCartHandler)
router.post("/addToSalesCart", addToSalesCartHandler)
router.delete("/:id", salesCartDeleteHandler)
router.put('/update', putSalesCartHandler)

module.exports = router