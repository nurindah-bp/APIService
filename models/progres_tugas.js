const { sequelize, DataTypes, Sequelize } = require("../services/db.js");

const tableName = "progres_tugas";
const ProgresTugasModel = sequelize.define(
  tableName,
  {
    id_progrestugas: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_tugas: {
      type: DataTypes.INTEGER,
    },
    progres_tugas: {
      type: DataTypes.TEXT('medium'),
    },
    catatan_tugas: {
      type: DataTypes.TEXT('medium'),
    },
    status_tugas: {
      type: DataTypes.INTEGER,
    },
    tgl_pengerjaan: {
      type: DataTypes.DATE,
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

module.exports = ProgresTugasModel; 