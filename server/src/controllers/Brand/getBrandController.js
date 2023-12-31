const {Brand} = require("../../db")

const getBrandController = async() =>{
    
    const brands = await Brand.findAll({
        where: {
          deleted: false,
        }
        });

    return brands;
}
module.exports = getBrandController;