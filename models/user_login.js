const { sequelize, DataTypes } = require("../services/db.js");

const tableName = "user_login";
const UserLoginModel = sequelize.define(
  tableName,
  {
    id_login: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pegawai: {
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName : true
  }
);

module.exports = UserLoginModel; 