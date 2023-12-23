const getFilterBrandController = require ('../../controllers/Product/getFilterBrandController')


const getFilterBrandHandler = async(req, res) =>{

    const {brand} = req.query
    console.log(brand)

    try {

        await getFilterBrandController(brand)
                
    } catch (error) {

        res.status(500).json({ error: "SERVER ERROR" });
    }

}

module.exports = getFilterBrandHandler