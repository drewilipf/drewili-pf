const { Product } = require('../../db')

const putProductsController = async (id, updatedProductData)=>{
        const product = await Product.findByPk(id)

        if(!product) throw new Error ('producto no encontrado')

        await product.update(updatedProductData)
}
module.exports = putProductsController