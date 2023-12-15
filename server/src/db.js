require('dotenv').config();
const { Sequelize } = require('sequelize');
const ProductModel = require('./models/products')
const CategoryModel = require('./models/categories')
const { DB_URL } = process.env;

const sequelize = new Sequelize(
   DB_URL,
   {
      //comentar esta opcion para usar la DBB local.
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      ssl: true,
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

// Aca vendrian las relaciones
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });

module.exports = {
   Category,
   Product, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};