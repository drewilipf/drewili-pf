const {DataTypes, UUIDV4} = require('sequelize')

module.exports = (sequelize) =>{
    const Category = sequelize.define('categories',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        category:{
            type: DataTypes.STRING
        }
    })
    return Category
}

