const { sequelize, DataTypes, Sequelize } = require("../services/db.js");

const tableName = "project_task";
const ProjectTaskModel = sequelize.define(
  tableName,
  {
    ptask_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ptask_name: {
      type: DataTypes.STRING(200),
    },
    ptask_description: {
      type: DataTypes.TEXT('medium'),
    },
    project_id: {
      type: DataTypes.INTEGER,
    },
    employee_id: {
      type: DataTypes.INTEGER,
    },
    ptask_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
    ptask_deadline: {
      type: DataTypes.DATE,
    },
    ptask_urgent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ptask_status: {
      type: DataTypes.INTEGER,
    },
    user_id: {
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

module.exports = ProjectTaskModel; 