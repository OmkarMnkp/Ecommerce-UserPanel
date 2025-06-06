const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // your sequelize instance

const CartItem = sequelize.define("CartItem", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = CartItem;

