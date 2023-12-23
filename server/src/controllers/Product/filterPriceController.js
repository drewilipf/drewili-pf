const { Op } = require("sequelize");
const { Product } = require("../../db");

const filterPriceController = async (minPrice, maxPrice) => {
    const products = await Product.findAll({
        where: {
            price: {
                [Op.between]: [minPrice, maxPrice],
            },
            deleted: false,
        },
    });
    return products;
};

module.exports = filterPriceController;
