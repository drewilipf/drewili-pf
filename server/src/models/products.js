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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      realPrice: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      specifications: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageArray: {
        type: DataTypes.JSON,
        allowNull: true,
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
      relevance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        validate: {
          min: 0,
          max: 2,
        },
      },
      discount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      getterMethods: {
        finalPrice() {
          // Verifica si hay un descuento y calcula el precio final
          if (this.discount && this.price) {
            const discountAmount = this.price * (this.discount / 100);
            return (this.price - discountAmount).toFixed(2);
          }
          // Si no hay descuento, devuelve el precio original
          return this.price;
        },
      },
    }
  );
  return Product;
};
