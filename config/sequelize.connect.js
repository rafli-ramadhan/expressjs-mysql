const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: 0,  // 0 for false and 1 for true
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  },
)

// model
User = sequelize.define(
    "user",  // model name
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      gender: {
        type: DataTypes.ENUM(['male', 'female']),
        defaultValue: "male"
      },
      role: {
        type: DataTypes.ENUM(['admin', 'member']),
        defaultValue: "member"
      },
      updatedSkriningResult: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    // {freezeTableName: true // Enforcing the table name to be equal to the model name },
    {
      tableName: 'user_db'    // Providing the table name directly
    }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

// Testing connection - 1st Version
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(error => console.log('Unable to connect to the database:', error));

module.exports = {User, sequelize}

/* 
// Testing connection - 2nd Version - Working
module.exports = async function connect() {
  try {
    await dbConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  // In server.js remove require("./config/db.connect").sync with require("./config/db.connect")().sync;
}
*/