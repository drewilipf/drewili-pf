const successController = require("../../controllers/Payment/successControler");

  
  const successHandler = async (req, res) => {
      try {
          const userId = req.query.userId;
          const updateProduct = JSON.parse(req.query.updateProduct);
          
          const data = await successController(userId, updateProduct);
          const id = data.length > 0 ? data[0].id : null
          res.redirect(`https://drewilifront.vercel.app/payment/success?id=${id}`);
      } catch (error) {
          res.status(500).send('Error en el servidor');
      }
  };
  
  module.exports = successHandler


