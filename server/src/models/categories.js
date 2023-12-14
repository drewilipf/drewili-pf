const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    const Category = sequelize.define('categories',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category:{
            type: DataTypes.STRING
        }
    },
    { timestamps: false })
    return Category
}

