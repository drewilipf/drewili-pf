const successController = require("../../controllers/Payment/successControler")

const successlHandler = async(req, res) => {
    try {
        const userId = req.query.userId
        console.log(userId, 'este es el id');
        await successController(userId)
        res.redirect('http://localhost:5173/payment/success')
    } 
    catch (error) {
        
    }
}

module.exports = successlHandler