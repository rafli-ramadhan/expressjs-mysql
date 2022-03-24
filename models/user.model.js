/* Define model
module.exports = (sequelize) => {
  const User = sequelize.define(modelName, attributes, options);
  return User;
}*/
module.exports = () => {
  const { sequelize, DataTypes } = require("sequelize");
  const User = sequelize.define(
    "user",  // model name
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
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
        type: DataTypes.ENUM(['male', 'female'])
      },
      role: {
        type: DataTypes.ENUM(['admin', 'user'])
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
    /*{
      freezeTableName: true // Enforcing the table name to be equal to the model name
    },*/
    {
      tableName: 'user_db' // Providing the table name directly
    }
  );
  return User;
}
