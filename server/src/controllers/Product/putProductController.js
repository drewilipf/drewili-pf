const { Product } = require('../../db')

const putProductsController = async (id, updatedProductData)=>{

 

        const product = await Product.findByPk(id)

        if(!product) throw new Error ('producto no encontrado')

        await product.update(updatedProductData)

        return res.status(200).json({message:"Producto atualizado"})
        
    

}
module.exports = putProductsController