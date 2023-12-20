const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      specifications: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "colors",
          key: "id",
        },
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "brands",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Product;
};
