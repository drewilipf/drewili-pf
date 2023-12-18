const getCommentsController = require("../../controllers/Comment/getCommentController");

const getCommentsHandler = async (req, res) => {
    try {
        const commentsResult = await getCommentsController();
        res.status(200).json(commentsResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCommentsHandler;
