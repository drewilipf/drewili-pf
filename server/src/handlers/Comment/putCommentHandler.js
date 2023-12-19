const putCommentController = require("../../controllers/Comment/putCommentController");

const putCommentHandler = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { updatedComment } = req.body;

        const updatedCommentResult = await putCommentController(commentId, updatedComment);

        res.status(200).json(updatedCommentResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = putCommentHandler;
