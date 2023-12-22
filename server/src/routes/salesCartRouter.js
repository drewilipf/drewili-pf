const {Router} = require('express')
const getSalesCartHandler = require('../handlers/SalesCart/getSalesCartHandler')
const salesCartDeleteHandler = require('../handlers/SalesCart/deleteSalesCardHandler')


const router = Router()

router.get("/user/:userId", getSalesCartHandler)
router.delete("/:id", salesCartDeleteHandler)

module.exports = router