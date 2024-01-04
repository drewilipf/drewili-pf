const getPurchaseHistoryController = require("../../controllers/PurchaseHistory/getPurchaseHistory");

const getPurchaseHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const purchaseHistory = await getPurchaseHistoryController(userId);

        res.status(200).json(purchaseHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getPurchaseHistory;
