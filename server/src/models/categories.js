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
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    { timestamps: false })
    return Category
}

