const { Product } = require('../../db')

const putProductsController = async (id, updatedProductData)=>{

    try {

        const product = await Product.findByPk(id)

        if(!product) return res.status(404).json({ error: 'Producto no encontrado' })

        await product.update(updatedProductData)

        return res.status(200).json({message:"Producto atualizado"})
        
    } catch (error) {

        res.status(500).json({ error: "SERVER ERROR" });
        
    }

}
module.exports = putProductsController