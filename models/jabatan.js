const { sequelize, DataTypes } = require("../services/db.js");

const tableName = "jabatan";
const JabatanModel = sequelize.define(
  tableName,
  {
    id_jabatan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_jabatan: {
      type: DataTypes.STRING(100),
    },
    status_jabatan: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName : true
  }
);

module.exports = JabatanModel; 