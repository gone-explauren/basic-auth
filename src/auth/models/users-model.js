'use strict'

const { DataTypes } = require('sequelize');

// const sequelize = new Sequelize("sqlite:memory:");

// Create a Sequelize model
const Users = (sequelize) => sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
		unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Users;