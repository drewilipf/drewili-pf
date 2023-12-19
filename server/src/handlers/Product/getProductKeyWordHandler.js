const getProductKeyWordController = require("../../controllers/Product/getProductKeyWordController")

const getProductKeyWordHandler = async (req, res) =>{

    const {keyWord} = req.query

    

    try {

        
        const products = await getProductKeyWordController(keyWord)

        res.status(200).json(products)
        
    } catch (error) {
        
        res.status(500).json({ error: "no hay productos con esta palabra clave" });
        
    }

}

module.exports = getProductKeyWordHandler