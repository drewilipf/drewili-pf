const { Product,  Brand } = require("../../db")


const getFilterBrandController = async(brand) => {
    
    
    const selectedBrand = await Brand.findOne({
            where:{brand: brand}
             })

    const products = await Product.findAll({
        where: {
            brand_id: selectedBrand.id,
            deleted: false,
        }

    })
    
    return products
}

module.exports = getFilterBrandController

