const { sequelize, DataTypes, Sequelize } = require("../services/db.js");

const tableName = "task";
const TaskModel = sequelize.define(
  tableName,
  {
    task_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task_name: {
      type: DataTypes.STRING(200),
    },
    task_description: {
      type: DataTypes.TEXT('medium'),
    },
    employee_id: {
      type: DataTypes.INTEGER,
    },
    task_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
    task_deadline: {
      type: DataTypes.DATE,
    },
    task_urgent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    task_status: {
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

module.exports = TaskModel; 