const filterPriceController = require("../../controllers/Product/filterPriceController");

const filterPriceHandler = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query; 
        if (!minPrice || !maxPrice) {
            return res.status(400).json({ error: "Debe proporcionar minPrice y maxPrice en la consulta" });
        }

        const products = await filterPriceController(minPrice, maxPrice);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = filterPriceHandler;
