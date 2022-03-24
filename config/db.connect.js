const Sequelize = require("sequelize");

// Option 3: Passing parameters separately (other dialects) in Sequelize Official Web
const dbConnection = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",     // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
    operatorsAliases: 0,  // 0 for false and 1 for true
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // SQLite only
    // storage: 'path/to/database.sqlite'
  },
)

// Testing connection - 1st Version
module.exports = dbConnection.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(error => console.log('Unable to connect to the database:', error));

/* Testing connection - 2nd Version - Working
module.exports = async function connect() {
  try {
    await dbConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  // In server.js remove require("./config/db.connect").sync with require("./config/db.connect")().sync;
}*/