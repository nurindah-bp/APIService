const { sequelize, DataTypes } = require("../services/db.js");

const tableName = "m_employee";
const EmployeeModel = sequelize.define(
  tableName,
  {
    employee_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_number: {
      type: DataTypes.STRING(100),
    },
    employee_name: {
      type: DataTypes.STRING(150),
    },
    position_id: {
      type: DataTypes.INTEGER,
    },
    division_id: {
      type: DataTypes.INTEGER,
    },
    employee_status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName : true
  }
);

module.exports = EmployeeModel; 