const {Brand} = require("../../db")

const brandSoftDeleteController = async(id) =>{
    
    const brand = await Brand.findByPk(id);
    
    brand.deleted = true;
    
    await brand.save();
    
    return brand;
}
    
module.exports = brandSoftDeleteController;