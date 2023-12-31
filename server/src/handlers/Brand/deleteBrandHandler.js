const brandSoftDeleteController = require("../../controllers/Brand/deleteBrandController");


const brandSoftDeleteHandler = async(req, res) => {
    try {
        const { id } = req.params;

        const brand = await brandSoftDeleteController(id);

        if (!brand) {
            return res.status(404).json({ error: 'Marca no encontrada' });
        }
        res.status(200).send("Marca eliminada correctamente");
        
    }   catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = brandSoftDeleteHandler;