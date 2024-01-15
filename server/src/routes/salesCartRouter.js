const {Router} = require('express')
const getSalesCartHandler = require('../handlers/SalesCart/getSalesCartHandler')
const salesCartDeleteHandler = require('../handlers/SalesCart/deleteSalesCardHandler')
const addToSalesCartHandler = require('../handlers/SalesCart/addToSalesCart')
const putSalesCartHandler = require('../handlers/SalesCart/putSalesCartHandler')
const allDelete = require('../handlers/SalesCart/allDelete')


const router = Router()

router.get("/user/:userId", getSalesCartHandler)
router.post("/addToSalesCart", addToSalesCartHandler)
router.delete("/delete", salesCartDeleteHandler)
router.put('/update', putSalesCartHandler)
router.delete('/alldelete/:userId', allDelete)

module.exports = router