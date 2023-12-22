const salesCartDeleteController = require("../../controllers/SalesCart/deleteSalesCardController");


const salesCartDeleteHandler = async(req, res) => {
    try {
        const { id } = req.params;

        const salesCart = await salesCartDeleteController(id);

        if (!salesCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).send("Carrito eliminado");
        
    }   catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = salesCartDeleteHandler;