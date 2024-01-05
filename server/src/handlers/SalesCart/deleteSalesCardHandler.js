const salesCartDeleteController = require("../../controllers/SalesCart/deleteSalesCardController");


const salesCartDeleteHandler = async(req, res) => {
    try {
        const { id, userId } = req.query;
        console.log(id, userId,'datos por query ');
        const salesCart = await salesCartDeleteController(id, userId);

        if (!salesCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json(salesCart);
        
    }   catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = salesCartDeleteHandler;