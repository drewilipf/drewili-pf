const { PurchaseHistory } = require("../../db");

const updatePurchaseHistory = async (
  purchaseId,
  newPaymentStatus,
  paymentPdf
) => {
  try {
    const purchase = await PurchaseHistory.findByPk(purchaseId);

    if (!purchase) {
      throw new Error("Compra no encontrada");
    }

    console.log("Compra encontrada:", purchase);
    if (newPaymentStatus) {
      purchase.paymentStatus = newPaymentStatus;
    }
    // Verifica si se proporcionó un archivo PDF antes de intentar guardarlo
    if (paymentPdf) {
      purchase.paymentPdf = paymentPdf;
    }

    await purchase.save();

    return {
      success: true,
      message: "Estado de pago o pdf actualizado correctamente",
    };
  } catch (error) {
    throw new Error(
      `Error al actualizar el estado de pago o pdf: ${error.message}`
    );
  }
};

module.exports = updatePurchaseHistory;
