require('dotenv').config();
const { Sequelize } = require('sequelize');
const ProductModel = require('./models/products')
const CategoryModel = require('./models/categories')
const BrandModel = require('./models/brand')
const SalesCartModel = require('./models/saleCart')
const UserModel = require('./models/users')
const CommentModel = require('./models/comments')
const FavoriteModel = require('./models/favorites')
const ColorsModel = require('./models/colors');
const PurchaseModel = require('./models/purchaseHistory')

const { DB_URL } = process.env;

const sequelize = new Sequelize(
   DB_URL,
   {
      
      logging: false, 
      native: false, 
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
const SalesCart = SalesCartModel(sequelize)
const User = UserModel(sequelize)
const Comments = CommentModel(sequelize)
const Favorite = FavoriteModel(sequelize)
const Colors = ColorsModel(sequelize)
const PurchaseHistory = PurchaseModel(sequelize)


Product.belongsTo(Category, { foreignKey: 'category_id', as: 'Category' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'Category' });

Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'Brand'});
Brand.hasMany(Product, { foreignKey: 'brand_id', as: 'Brand' });

Product.belongsTo(Colors,{foreignKey:'color_id', as: 'Colors'})
Colors.hasMany(Product,{foreignKey: 'color_id', as: 'Colors'})

SalesCart.belongsTo(User, {foreignKey: 'user_id'})
SalesCart.belongsTo(Product, { foreignKey: 'product_id' });
Product.belongsToMany(User, { through: SalesCart, foreignKey: 'product_id' });
User.belongsToMany(Product, { through: SalesCart, foreignKey: 'user_id' });

PurchaseHistory.belongsTo(User, {foreignKey: 'user_id'})
PurchaseHistory.belongsTo(Product, { foreignKey: 'product_id' });
Product.belongsToMany(User, { through: PurchaseHistory, foreignKey: 'product_id' });
User.belongsToMany(Product, { through: PurchaseHistory, foreignKey: 'user_id' });

Product.belongsToMany(User, { through: Comments, foreignKey: 'product_id' });
User.belongsToMany(Product, { through: Comments, foreignKey: 'user_id' });

Product.belongsToMany(User, {through: Favorite, foreignKey: 'product_id'});
User.belongsToMany(Product, {through: Favorite, foreignKey: 'user_id'})

Comments.belongsTo(User, {foreignKey: 'user_id'});
Comments.belongsTo(Product, {foreignKey: 'product_id'});

Favorite.belongsTo(User, {foreignKey: 'user_id'})
Favorite.belongsTo(Product, {foreignKey: 'product_id'})


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
   SalesCart,
   Comments,
   Favorite,
   Colors,
   PurchaseHistory,
   conn: sequelize, 
};