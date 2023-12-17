const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

   const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    { timestamps: false })
    return User
}