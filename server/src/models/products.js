const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30000),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(30000),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    specifications: {
      type: DataTypes.STRING(30000),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(30000),
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
      defaultValue: true,
      allowNull: false,
    },
    relevance: {
      type: DataTypes.INTEGER,
      allowNull: tru,
      defaultValue: 0,
    },
  });
  return Product;
};
