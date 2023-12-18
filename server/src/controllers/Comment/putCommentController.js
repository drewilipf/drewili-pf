const { Comments } = require("../../db");

const putCommentController = async (commentId, updatedComment) => {
    const errorMessage = "Actualice su comentario!";

    if (!updatedComment) {
        throw new Error(errorMessage);
    }

    const [rowsUpdated, [updatedRow]] = await Comments.update(
        { comment: updatedComment },
        { where: { id: commentId }, returning: true }
    );

    if (!rowsUpdated) {
        throw new Error("Comentario no encontrado");
    }

    return updatedRow;
};

module.exports = putCommentController;
