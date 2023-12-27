const { Product,  Brand, Category, Colors } = require("../../db")


const getFilterBrandController = async(brand) => {
    
    
    const selectedBrand = await Brand.findOne({
            where:{brand: brand}
             })

    const products = await Product.findAll({
        where: {
            brand_id: selectedBrand.id,
            deleted: false,
        },
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
        ]

    })
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
}

module.exports = getFilterBrandController

