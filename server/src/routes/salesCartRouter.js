const {Router} = require('express')
const getSalesCartHandler = require('../handlers/SalesCart/getSalesCartHandler')


const router = Router()

router.get("/user/:userId", getSalesCartHandler)

module.exports = router