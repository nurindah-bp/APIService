const { sequelize, DataTypes, Sequelize } = require("../services/db.js");

const tableName = "proyek";
const ProyekModel = sequelize.define(
  tableName,
  {
    id_proyek: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_proyek: {
      type: DataTypes.STRING(200),
    },
    deskripsi_proyek: {
      type: DataTypes.TEXT('medium'),
    },
    id_pegawai: {
      type: DataTypes.INTEGER,
    },
    tgl_proyek: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
    deadline_proyek: {
      type: DataTypes.DATE,
    },
    status_proyek: {
      type: DataTypes.INTEGER,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
    stamp_date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    freezeTableName : true
  }
);

module.exports = ProyekModel; 