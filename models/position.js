const { sequelize, DataTypes } = require("../services/db.js");

const tableName = "m_position";
const PositionModel = sequelize.define(
  tableName,
  {
    position_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    position_name: {
      type: DataTypes.STRING(100),
    },
    position_status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName : true
  }
);

module.exports = PositionModel; 