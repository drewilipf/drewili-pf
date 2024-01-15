const { Comments, User } = require("../../db");

const getCommentsController = async () => {

  const comments = await Comments.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  });

  const formattedComments = comments.map((comment) => {
    //uso Date para obtener los componentes especificos de la fecha: dia/mes/año, hora/minuto/segundo
    const formattedDate = new Date(comment.createdAt).toLocaleString();

    return {
      id: comment.id,
      userId: comment.user_id,
      username: comment.user?.username,
      productId: comment.product_id,
      comment: comment.comment,
      rating: comment.rating,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };
  });

  return formattedComments;

};

module.exports = getCommentsController;
