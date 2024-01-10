const { PurchaseHistory, Product, User } = require("../../db");

const getAllPurchaseHistory = async () => {
  const purchaseHistory = await PurchaseHistory.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "name", "image", "price"],
      },
      {
        model: User,
        attributes: ["id", "email", "username"], 
      },
    ],
    order: [["id", "ASC"]],
  });

  if (purchaseHistory.length === 0) {
    throw new Error("No se encontraron registros de compra");
  }

  const formattedPurchaseHistory = purchaseHistory.map((purchase) => ({
    purchaseId: purchase.id,
    productId: purchase.product_id,
    productName: purchase.product.name,
    productImage: purchase.product.image,
    productPrice: purchase.product.price,
    quantity: purchase.quantity,
    userEmail: purchase.user.email,
    userName: purchase.user.username,
    date: purchase.purchase_date,
    paymentPdf: purchase.paymentPdf,
    paymentStatus: purchase.paymentStatus,
  }));

  return formattedPurchaseHistory;
};

module.exports = getAllPurchaseHistory;
