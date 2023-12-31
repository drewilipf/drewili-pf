const productSoftDeleteController = require('../../controllers/Product/deleteProductController');

const productSoftDeleteHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productSoftDeleteController(id)

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        return res.status(200).json({ message: 'Producto eliminado exitosamente' });

    }   catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = productSoftDeleteHandler;
