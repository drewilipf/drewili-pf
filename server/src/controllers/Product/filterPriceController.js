const { Op } = require("sequelize")
const { Product } = require("../../db")

const filterPriceController = (minPrice, maxPrice) => {
    const product = Product.findAll({
        where: {
            price:{
                [Op.between]: [minPrice, maxPrice]
            },
            deleted: false
        }
    })
    return product
}

module.exports = filterPriceController