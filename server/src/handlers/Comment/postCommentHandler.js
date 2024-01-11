const postCommentController = require("../../controllers/Comment/postCommentController");

const postCommentHandler = async (req, res) => {
    try {
        const { user_id, product_id, comment, rating } = req.body;

        await postCommentController(user_id, product_id, comment, rating);

        return res.status(200).send("Comentario creado con exito")
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

module.exports = postCommentHandler;
