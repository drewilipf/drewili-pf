const { Op } = require("sequelize");
const { Product, Colors, Brand, Category } = require("../../db");

const filterPriceController = async (minPrice, maxPrice) => {
    const products = await Product.findAll({
        where: {
            price: {
                [Op.between]: [minPrice, maxPrice],
            },
            deleted: false,
        },
        include:[
            { model: Colors,
             attributtes:['color']
            },
            {
             model: Brand,
             attributtes:['brand']
            },
            {
             model: Category,
             attributtes:['category']
            }
           ]
    });
    const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        specifications: product.specifications,
        color: product.color.color,
        brand: product.brand.brand,
        category: product.category.category,
        stock: product.stock,
        image: product.image
    }));
    return formattedProducts
};

module.exports = filterPriceController;
