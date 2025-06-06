// Import the Sequelize instance from the database configuration file
const sequelize = require('../config/db');

// Import DataTypes from Sequelize for defining model field types
const { DataTypes } = require('sequelize');

// Define a Sequelize model named 'Brand'
const Brand = sequelize.define('Brand', {
    // Define 'id' column as the primary key, auto-incrementing integer
    id: {
        type: DataTypes.INTEGER,     // Integer type
        primaryKey: true,            // Set as Primary Key
        autoIncrement: true          // Auto-increments on each new row
    },
    // Define 'name' column as a non-null string
    name: {
        type: DataTypes.STRING,      // String type (VARCHAR)
        allowNull: false             // Cannot be null
    },
    // Define 'image' column as a non-null string
    image: {
        type: DataTypes.STRING,      // String type (VARCHAR)
        allowNull: false             // Cannot be null
    }
}, {
    tableName: 'Brands',             // Explicitly set the table name in the database
    timestamps: false                // Disable automatic `createdAt` and `updatedAt` fields
});

// Export the Brand model so it can be used in other parts of the application
module.exports = Brand;
