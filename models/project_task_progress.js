const { sequelize, DataTypes, Sequelize } = require("../services/db.js");

const tableName = "project_task_progress";
const ProjectTaskProgressModel = sequelize.define(
  tableName,
  {
    ptask_progressid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ptask_id: {
      type: DataTypes.INTEGER,
    },
    ptask_progress: {
      type: DataTypes.TEXT('medium'),
    },
    ptask_progressnote: {
      type: DataTypes.TEXT('medium'),
    },
    ptask_progressstatus: {
      type: DataTypes.INTEGER,
    },
    ptask_progressdate: {
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

module.exports = ProjectTaskProgressModel; 