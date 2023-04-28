const { sequelize, DataTypes } = require("../services/db.js");

const tableName = "bidang";
const BidangModel = sequelize.define(
  tableName,
  {
    id_bidang: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_bidang: {
      type: DataTypes.STRING(100),
    },
    status_bidang: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName : true
  }
);

module.exports = BidangModel; 