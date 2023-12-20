const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Colors = sequelize.define(
    "colors",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      color: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
  return Colors;
};
