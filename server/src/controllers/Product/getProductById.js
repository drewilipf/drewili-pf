const { Product, Category, Brand } = require("../../db");

const getProductById = async(id) => {
    const products = await Product.findAll({
        where: { id: id },
        include: [
            {
                model: Category,
                attributes: ['category']
            },
            {
                model: Brand,
                attributes: ['brand']
            }
        ]
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

}

module.exports = getProductById