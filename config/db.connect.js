const dbConfig = require("./db.config.js");

const Sequelize = require("sequelize");

const dbConnection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

// check connection
dbConnection.authenticate()
.then(() => console.log("Connected to the database !"))
.catch(err => console.log("Failed to connect with database"));

module.exports = dbConnection;