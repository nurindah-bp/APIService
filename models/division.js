const { sequelize, DataTypes } = require("../services/db.js");

const tableName = "m_division";
const DivisionModel = sequelize.define(
  tableName,
  {
    division_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    division_name: {
      type: DataTypes.STRING(100),
    },
    division_status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName : true
  }
);

module.exports = DivisionModel; 