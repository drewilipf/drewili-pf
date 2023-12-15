const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    const Brand = sequelize.define('brands',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        brand:{
            type: DataTypes.STRING
        }
    },
    { timestamps: false })
    return Brand
}
