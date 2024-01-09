const updatePurchaseHistoryController = require("../../controllers/PurchaseHistory/putPurchaseHistory");

const updatePurchaseHistory = async (req, res) => {
  try {
    const { purchaseId } = req.params;
    console.log("ID de compra a actualizar:", purchaseId);
    const { newPaymentStatus } = req.body;

    const result = await updatePurchaseHistoryController(purchaseId, newPaymentStatus);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updatePurchaseHistory;
