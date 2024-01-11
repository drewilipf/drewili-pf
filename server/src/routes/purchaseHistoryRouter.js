const {Router} = require('express')
const getPurchaseHistory = require("../handlers/PurchaseHistory/getPurchaseHistory") 
const getAllPurchaseHistory = require('../handlers/PurchaseHistory/getAllPurchaseHistory')
const updatePurchaseHistory = require('../handlers/PurchaseHistory/putPurchaseHistory')
const postHistoryHandler = require('../handlers/PurchaseHistory/postHistoryHandler')


const router = Router()

router.get("/:userId", getPurchaseHistory)
router.get("/", getAllPurchaseHistory)
router.put("/update/:purchaseId", updatePurchaseHistory)
router.post('/:userId', postHistoryHandler)

module.exports = router