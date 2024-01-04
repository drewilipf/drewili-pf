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
            attributes: ['id', 'name', 'image', 'price'],
            include: [
                {
                  model: Category,
                  attributes: ["category"],
                  as: "Category", // Agrega un alias para la tabla Category
                },
                {
                  model: Brand,
                  attributes: ["brand"],
                  as: "Brand", // Agrega un alias para la tabla Brand
                },
            ],
        },
    });

    if (allSalesCarts.length === 0){
        return allSalesCarts
    }

    const formattedSalesCart = allSalesCarts.map((product)=>({
        salesCartId: product.id,
        id: product.product.id,
        name: product.product.name,
        image: product.product.image,
        price: product.product.price,
        quantity: product.quantity,
        totalPrice: product.product.price*product.quantity,
        brand: product.product.Brand.brand
    }))

    const totalCartPrice = formattedSalesCart.reduce((total, product)=> total + product.totalPrice, 0)

    return {
        products: formattedSalesCart,
        totalCartPrice: totalCartPrice
    };
}

module.exports = salesCartController