const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    const PurchaseHistory = sequelize.define('purchaseHistory',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        paymentPdf: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        paymentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pendiente', 
            validate: {
              isIn: [['pendiente', 'aprobado', 'rechazado']]
            }
        },
    },
    { timestamps: false });
    return PurchaseHistory
}