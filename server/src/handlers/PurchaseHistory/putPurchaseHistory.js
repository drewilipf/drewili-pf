const updatePurchaseHistoryController = require("../../controllers/PurchaseHistory/putPurchaseHistory");

const updatePurchaseHistory = async (req, res) => {
  try {
    const { purchaseId } = req.params;

    const { newPaymentStatus } = req.body;

    
    const paymentPdf = req.file ? req.file.buffer : null;

    const result = await updatePurchaseHistoryController(
      purchaseId,
      newPaymentStatus,
      paymentPdf
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updatePurchaseHistory;
