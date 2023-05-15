const { sequelize, DataTypes, Sequelize } = require("../services/db.js");

const tableName = "project";
const ProjectModel = sequelize.define(
  tableName,
  {
    project_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_div: {
      type: DataTypes.INTEGER,
    },
    project_name: {
      type: DataTypes.STRING(200),
    },
    project_description: {
      type: DataTypes.TEXT('medium'),
    },
    employee_id: {
      type: DataTypes.INTEGER,
    },
    project_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
    project_deadline: {
      type: DataTypes.DATE,
    },
    project_status: {
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

module.exports = ProjectModel; 