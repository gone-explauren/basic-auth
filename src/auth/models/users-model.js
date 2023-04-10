'use strict'

// Create a Sequelize model
const Users = sequelize.define('User', {
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