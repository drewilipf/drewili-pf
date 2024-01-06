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
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'cliente'
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        auth0UserId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        auth0DisplayName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        auth0Email: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    { timestamps: false })
    return User
}