const { sequelize, DataTypes, Sequelize } = require("../services/db.js");

const tableName = "tugas";
const TugasModel = sequelize.define(
  tableName,
  {
    id_tugas: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_tugas: {
      type: DataTypes.STRING(200),
    },
    deskripsi_tugas: {
      type: DataTypes.TEXT('medium'),
    },
    id_pegawai: {
      type: DataTypes.INTEGER,
    },
    tgl_tugas: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
    deadline_tugas: {
      type: DataTypes.DATE,
    },
    urgensi_tugas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status_tugas: {
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

module.exports = TugasModel; 