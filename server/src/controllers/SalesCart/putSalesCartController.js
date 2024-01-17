const { SalesCart, Product, Category, Brand } = require("../../db")

const salesCartController = async(id, quantity, userId) => {
   const saleCartProduct = await SalesCart.findOne({
        where:{
            id: id
        }
    })
    if (saleCartProduct) {
        saleCartProduct.quantity = quantity
        await saleCartProduct.save()
    }
    const allSalesCarts = await SalesCart.findAll({

        where: { user_id: userId },
        include: {
            model: Product,
            attributes: ['id', 'name', 'imageArray', 'price', 'stock', 'discount'],
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
        order: [['id', 'ASC']]
    });

    if (allSalesCarts.length === 0){
        return allSalesCarts
    }

    const formattedSalesCart = allSalesCarts.map((product)=>{
        const finalPrice = product.product.finalPrice;
        return{
            salesCartId: product.id,
            id: product.product.id,
            stock: product.product.stock,
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

module.exports = salesCartController