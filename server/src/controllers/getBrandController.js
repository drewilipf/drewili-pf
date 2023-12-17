const {Brand} = require("../db")

const getBrandController = async() =>{
    
    const brands = await Brand.findAll();

    return brands;
}
module.exports = getBrandController;