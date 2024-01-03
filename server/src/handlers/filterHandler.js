const filterController = require("../controllers/filterController");

const filterHandler = async(req, res) =>{
    try {
        const filters = {
            category: req.query.category,
            brand: req.query.brand,
            color: req.query.color,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
          };
      
          const filteredProducts = await filterController(filters);
          console.log(filteredProducts);
          res.json({ success: true, products: filteredProducts });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        
    }
}

module.exports = filterHandler