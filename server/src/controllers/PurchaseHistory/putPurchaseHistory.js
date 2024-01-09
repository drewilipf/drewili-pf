const { PurchaseHistory } = require("../../db");

const updatePurchaseHistory = async (purchaseId, newPaymentStatus) => {
  try {
    const purchase = await PurchaseHistory.findByPk(purchaseId);

    if (!purchase) {
      throw new Error("Compra no encontrada");
    }

    purchase.paymentStatus = newPaymentStatus;

    await purchase.save();

    return { success: true, message: "Estado de pago actualizado correctamente" };
  } catch (error) {
    throw new Error(`Error al actualizar el estado de pago: ${error.message}`);
  }
};

module.exports = updatePurchaseHistory;
