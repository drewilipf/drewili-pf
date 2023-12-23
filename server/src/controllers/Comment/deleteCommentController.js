const {Comments} = require("../../db")

const commentDeleteController = async(id) =>{
    
    const comment = await Comments.destroy({
        where: {
            id: id}
        });
    
    return comment;
}
    
module.exports = commentDeleteController;