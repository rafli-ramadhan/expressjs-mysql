const { Sequelize, DataTypes } = require("sequelize")
const dbConfig = require("../config/db.config.js")

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.HOST,
    dialect: process.env.DB_CONNECTION,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize.authenticate()
  .then(() => console.log('connection has been established successfully.'))
  .catch(error => console.log('unable to connect to the database:', error))

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.User = require("../model/user.js")(DataTypes, sequelize)

module.exports = db;