const { Comments, User } = require("../../db");

const getCommentsController = async () => {
    const comments = await Comments.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'username'],
            },
        ],
    });

    

    const formattedComments = comments.map(comment => {

        //uso Date para obtener los componentes especificos de la fecha: dia/mes/año, hora/minuto/segundo
        const formattedDate = new Date(comment.createdAt).toLocaleString();

        return {
            id: comment.id,
            userId: comment.user_id,
            username: comment.user?.username,
            comment: comment.comment,

            //devuelvo formattedDate con la fecha y hora legibles
            createdAt: formattedDate,
            updatedAt: formattedDate,
        };
    });

    return formattedComments;
};

module.exports = getCommentsController;
