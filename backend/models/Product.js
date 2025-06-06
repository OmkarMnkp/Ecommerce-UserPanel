
// models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    brand: DataTypes.STRING,
    category: DataTypes.STRING,
  }, {
    tableName: 'products',
    timestamps: false,
  });

  Product.associate = (models) => {
    Product.hasMany(models.CartItem, { foreignKey: 'productId' });
  };

  return Product;
};
