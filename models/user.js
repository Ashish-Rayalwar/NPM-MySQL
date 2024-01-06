'use strict';
const {
  Model
} = require('sequelize');
const role = require('../enum/role');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isLogIn: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    isVerified : DataTypes.BOOLEAN,
    isActive : DataTypes.BOOLEAN,
    role: {
      type: DataTypes.ENUM(...Object.values(role)), 
      defaultValue: role.guest, 
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};