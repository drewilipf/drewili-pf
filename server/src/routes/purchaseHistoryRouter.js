const { Router } = require("express");
const multer = require("multer");

const getPurchaseHistory = require("../handlers/PurchaseHistory/getPurchaseHistory");
const getAllPurchaseHistory = require("../handlers/PurchaseHistory/getAllPurchaseHistory");
const updatePurchaseHistory = require("../handlers/PurchaseHistory/putPurchaseHistory");
const postHistoryHandler = require("../handlers/PurchaseHistory/postHistoryHandler");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get("/:userId", getPurchaseHistory);
router.get("/", getAllPurchaseHistory);

router.put(
  "/update/:purchaseId",
  upload.single("paymentPdf"),
  updatePurchaseHistory
);

router.post("/:userId", postHistoryHandler);

module.exports = router;
