const { Product } = require('../../db')

const sortProductController = async () => {
    
      const productRecommended = await Product.findAll({
        order: [['relevancia', 'DESC']],  // Ordenar por relevancia de forma descendente
        limit: 10,  // Limitar el número de productos recomendados
      });
  
      return productRecommended;
    
    };

    module.exports = sortProductController;
  
  