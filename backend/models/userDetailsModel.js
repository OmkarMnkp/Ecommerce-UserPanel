const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");



module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define("UserDetails", {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return UserDetails;
};
