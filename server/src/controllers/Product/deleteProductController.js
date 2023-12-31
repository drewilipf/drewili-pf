const { Product } = require('../../db');

const productSoftDeleteController = async (id) => {   
    
    const product = await Product.findByPk(id);

    product.deleted = true;
    
    await product.save();

    return product;

};

module.exports = productSoftDeleteController;



