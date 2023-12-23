const commentDeleteController = require("../../controllers/Comment/deleteCommentController");


const commentDeleteHandler = async(req, res) => {
    try {
        const { id } = req.params;

        const comment = await commentDeleteController(id);

        if (!comment) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }
        res.status(200).send("Comentario eliminado");
        
    }   catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = commentDeleteHandler;