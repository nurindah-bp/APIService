const { sequelize, DataTypes } = require("../services/db.js");

const tableName = "pegawai";
const PegawaiModel = sequelize.define(
  tableName,
  {
    id_pegawai: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    noinduk_pegawai: {
      type: DataTypes.STRING(100),
    },
    nama_pegawai: {
      type: DataTypes.STRING(150),
    },
    id_jabatan: {
      type: DataTypes.INTEGER,
    },
    id_bidang: {
      type: DataTypes.INTEGER,
    },
    status_pegawai: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName : true
  }
);

module.exports = PegawaiModel; 