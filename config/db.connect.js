const Sequelize = require("sequelize");

const dbConnection = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// check connection
dbConnection.authenticate()
.then(() => console.log("Connected to the database !"))
.catch(err => console.log("Failed to connect with database"));

module.exports = dbConnection;