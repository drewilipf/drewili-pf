require('dotenv').config();
const { Sequelize } = require('sequelize');
const ProductModel = require('./models/products')
const CategoryModel = require('./models/categories')
const BrandModel = require('./models/brand')
const UserModel = require("./models/users")
const { DB_URL } = process.env;

const sequelize = new Sequelize(
   DB_URL,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      ssl: false,
      dialectOptions: {
         ssl: {
            require: true,
            rejectUnauthorized: false,
         },
      },
   }
);
const Category = CategoryModel(sequelize);
const Product = ProductModel(sequelize);
const Brand = BrandModel(sequelize)
const User = UserModel(sequelize)

// Aca vendrian las relaciones
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Brand, { foreignKey: 'brand_id' });
Brand.hasMany(Product, { foreignKey: 'brand_id' });

sequelize.authenticate()
   .then(() => {
      console.log('Connection to the database has been established successfully.');
   })
   .catch(err => {
      console.error('Unable to connect to the database:', err);
   });

module.exports = {
   Category,
   Product,
   Brand,
   User,
   conn: sequelize, 
};