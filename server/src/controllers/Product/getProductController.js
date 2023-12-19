const { Product, Category, Brand } = require('../../db');

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
        stock: product.stock,
        image: product.image,
        brand: product.brand.brand,
        category: product.category.category // Extrae solo el atributo 'category'
    }));
    return formattedProducts
};

module.exports = getProductsController;
