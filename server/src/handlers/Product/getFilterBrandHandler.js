const getFilterBrandController = require ('../../controllers/Product/getFilterBrandController')


const getFilterBrandHandler = async(req, res) =>{

    const {brand} = req.query
    

    try {

        const result = await getFilterBrandController(brand)
        res.status(200).json(result)
                
    } catch (error) {

        res.status(500).json({ error: "SERVER ERROR" });
    }

}

module.exports = getFilterBrandHandler