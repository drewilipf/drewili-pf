const {Favorite} = require("../../db")

const favoriteDeleteController = async(id) =>{
    
    const favorite = await Favorite.destroy(id);  
       
    return favorite;
}
    
module.exports = favoriteDeleteController;