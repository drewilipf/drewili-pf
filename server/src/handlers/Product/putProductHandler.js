const putProductController = require ('../../controllers/Product/putProductController')


const putProductHandler = async(req, res) => {
    try {

        const { id } = req.params

        const updatedProductData = req.body

        await putProductController (id, updatedProductData)

        res.status(200).send("Producto actualizado exitosamente")
        
    } catch (error) {

        res.status(500).json({ error: "SERVER ERROR" });
        
    }
}

module.exports = putProductHandler
