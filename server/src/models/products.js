const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

    sequelize.define('products', {
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
        principalCategory: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secondCategory: {
            type: DataTypes.STRING,
            allowNull: true,
        },




    },
    { timestamps: false })
}