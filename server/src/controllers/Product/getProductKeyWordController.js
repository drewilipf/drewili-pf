const { Product, Category, Brand } = require("../../db")
const { Op } = require("sequelize")

const getProductKeyWordController = async(keyWord) => {
    
    
    if (!keyWord || typeof keyWord !== 'string' || keyWord === "mierda") {
     throw new Error('La palabra clave es inválida')
    }
    console.log(keyWord)
        
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${keyWord}%` // Buscar coincidencias parciales sin importar mayúsculas/minúsculas
                },
                deleted:false
            },
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
        
        })
        
        
        
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
    if(formattedProducts.length===0) throw new Error ('No hay productos con esta palabra clave')
     return formattedProducts

}

module.exports = getProductKeyWordController