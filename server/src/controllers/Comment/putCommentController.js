const { Comments } = require("../../db");

const putCommentController = async (commentId, updatedComment) => {
    const errorMessage = "Actualice su comentario!";

    if (!updatedComment) {
        throw new Error(errorMessage);
    }

    //uso Date para hacer legible la fecha
    const formattedDate = new Date().toLocaleString();

    const [rowsUpdated, [updatedRow]] = await Comments.update(

        //uso formattedDate para hacer legible la fecha de cuando se actualiza el comment
        { comment: updatedComment, updatedAt: formattedDate },
        { where: { id: commentId }, returning: true }
    );

    if (!rowsUpdated) {
        throw new Error("Comentario no encontrado");
    }

    return updatedRow;
};

module.exports = putCommentController;
