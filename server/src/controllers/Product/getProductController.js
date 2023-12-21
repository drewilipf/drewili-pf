const { Product, Category, Brand, Colors } = require('../../db');

const getProductsController = async () => {
    const products = await Product.findAll({
        include: [
            {
                model: Category,
                attributes: ['category']
            },
            {
                model: Brand,
                attributes: ['brand']
            },
            {
                model: Colors,
                attributes: ['color']
            }
        ],
                where: {
                deleted: false,
        }

    });

    const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        specifications: product.specifications,
        color: product.color.color,
        stock: product.stock,
        image: product.image,
        brand: product.brand.brand,
        category: product.category.category // Extrae solo el atributo 'category'
    }));
    return formattedProducts
};

module.exports = getProductsController;