const {SalesCart, Product, Category, Brand} = require("../../db")

const salesCartDeleteController = async(id, userId) =>{
    
    await SalesCart.destroy({
        where: {
            id: id}
        });
        const allSalesCarts = await SalesCart.findAll({

            where: { user_id: userId },
            include: {
                model: Product,
                attributes: ['id', 'name', 'imageArray', 'price','discount'],
                include: [
                    {
                      model: Category,
                      attributes: ["category"],
                      as: "Category", 
                    },
                    {
                      model: Brand,
                      attributes: ["brand"],
                      as: "Brand", 
                    },
                ],
            },
        });
    
        if (allSalesCarts.length === 0){
            return allSalesCarts
        }
    
        const formattedSalesCart = allSalesCarts.map((product)=>{
            const finalPrice = product.product.finalPrice;
            return {
                salesCartId: product.id,
                id: product.product.id,
                name: product.product.name,
                images: product.product.imageArray[0],
                price: finalPrice,
                quantity: product.quantity,
                totalPrice: finalPrice*product.quantity,
                brand: product.product.Brand.brand
            }
        })
    
        const totalCartPrice = formattedSalesCart.reduce((total, product) => total + parseFloat(product.totalPrice), 0).toFixed(2);
    
        return {
            products: formattedSalesCart,
            totalCartPrice: totalCartPrice
        };
}
    
module.exports = salesCartDeleteController;