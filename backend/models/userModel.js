

const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isAdmin:{
        type:DataTypes.BOOLEAN(),
        defaultValue:false
    }
},{
    tableName:'User',
    timestamps:false
});

module.exports = User;