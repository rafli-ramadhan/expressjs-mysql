const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

// testing connection
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(error => console.log('Unable to connect to the database:', error));

// assign sequelize, Sequelize and model to object db
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./user.model.js")(DataTypes, sequelize);

module.exports = db;