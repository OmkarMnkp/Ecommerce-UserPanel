
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = require('./categoryModel');
const Brand = require('./brandModel');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  instock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Products',
  timestamps: true
});

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'Category' });
Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'Brand' });

module.exports = Product;
