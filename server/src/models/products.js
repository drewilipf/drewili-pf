const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

   const Product = sequelize.define('products', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue:DataTypes.UUIDV4

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        specifications: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references:{
                model: 'categories',
                key: 'id'
            },
        },
    },
    { timestamps: false })
    return Product
}