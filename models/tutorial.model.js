const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    topic: {
      type: DataTypes.STRING
    },
    link: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  return Tutorial;
};
