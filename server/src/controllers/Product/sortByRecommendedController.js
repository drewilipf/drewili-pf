const { Product } = require("../../db");

const sortRecommendedController = async () => {
    
      const productRecommended = await Product.findAll({
        order: [['relevancia', 'DESC']],  
        limit: 10,  
      });
  
      return productRecommended;
    
    };

module.exports = sortRecommendedController;
  
  