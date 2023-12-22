const {SalesCart} = require("../../db")

const salesCartDeleteController = async(id) =>{
    
    const salesCart = await SalesCart.destroy({
        where: {
            id: id}
        });
    
    return salesCart;
}
    
module.exports = salesCartDeleteController;