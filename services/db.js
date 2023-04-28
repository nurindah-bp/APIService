// import { Sequelize, DataTypes } from "sequelize";
const { Sequelize, DataTypes } = require("sequelize");

const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "task_management",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = { connectDB, sequelize, Sequelize, DataTypes }; 