const {Router} = require('express')
const getPurchaseHistory = require("../handlers/PurchaseHistory/getPurchaseHistory") 
const getAllPurchaseHistory = require('../handlers/PurchaseHistory/getAllPurchaseHistory')
const updatePurchaseHistory = require('../handlers/PurchaseHistory/putPurchaseHistory')


const router = Router()

router.get("/:userId", getPurchaseHistory)
router.get("/", getAllPurchaseHistory)
router.put("/update/:purchaseId", updatePurchaseHistory)

module.exports = router