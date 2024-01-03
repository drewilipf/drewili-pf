const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    const SalesCart = sequelize.define('salesCart',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    { timestamps: false });

    SalesCart.emptyCart = async (userId) =>{
        try {
            await SalesCart.destroy({
                where:{
                    user_id: userId
                }
            })
            console.log(`Carrito del usuario ${userId} vaciado con exito`);
        }
        catch (error) {
            console.error('Error al vaciar el carrito', error)
        }
    }
    return SalesCart
}

