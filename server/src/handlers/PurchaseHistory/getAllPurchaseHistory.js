const getPurchaseHistoryController = require("../../controllers/PurchaseHistory/getAllPurchaseHistory");

const getAllPurchaseHistory = async (req, res) => {
  try {
    const purchaseHistory = await getPurchaseHistoryController();
    res.status(200).json(purchaseHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPurchaseHistory;
