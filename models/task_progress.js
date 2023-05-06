const { sequelize, DataTypes, Sequelize } = require("../services/db.js");

const tableName = "task_progress";
const TaskProgressModel = sequelize.define(
  tableName,
  {
    task_progressid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
    },
    task_progress: {
      type: DataTypes.TEXT('medium'),
    },
    task_progressnote: {
      type: DataTypes.TEXT('medium'),
    },
    task_progressstatus: {
      type: DataTypes.INTEGER,
    },
    task_progressdate: {
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

module.exports = TaskProgressModel; 