const {Router} = require('express')
const getPurchaseHistory = require("../handlers/PurchaseHistory/getPurchaseHistory") 

const router = Router()

router.get("/:userId", getPurchaseHistory)

module.exports = router