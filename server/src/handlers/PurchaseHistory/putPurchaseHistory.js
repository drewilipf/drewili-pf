const updatePurchaseHistoryController = require("../../controllers/PurchaseHistory/putPurchaseHistory");

const updatePurchaseHistory = async (req, res) => {
  try {
    const { purchaseId } = req.params;
    console.log("ID de compra a actualizar:", purchaseId);
    const { newPaymentStatus } = req.body;
    console.log("Nuevo estado de pago:", newPaymentStatus);
    const result = await updatePurchaseHistoryController(
      purchaseId,
      newPaymentStatus
    );
    console.log("Resultado de la actualización:", result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updatePurchaseHistory;
