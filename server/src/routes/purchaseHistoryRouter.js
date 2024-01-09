const {Router} = require('express')
const getPurchaseHistory = require("../handlers/PurchaseHistory/getPurchaseHistory") 
const getAllPurchaseHistory = require('../handlers/PurchaseHistory/getAllPurchaseHistory')


const router = Router()

router.get("/:userId", getPurchaseHistory)
router.get("/", getAllPurchaseHistory)

module.exports = router