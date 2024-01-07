const successController = require("../../controllers/Payment/successControler")

const successHandler = async (req, res) => {
    try {
        const userId = req.query.userId;
        const updateProduct = JSON.parse(req.query.updateProduct);
        console.log(userId, 'este es el usuario en la compra');
        console.log(updateProduct, 'update product del success');
        
        await successController(userId, updateProduct);
        
        res.redirect('https://drewilifront.vercel.app/payment/success');
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

module.exports = successHandler