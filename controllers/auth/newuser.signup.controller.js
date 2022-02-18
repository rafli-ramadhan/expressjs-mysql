// const User = require("../../models/user.model.js");
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');
const bcrypt = require('bcrypt');

// Define model - 2nd version
const Model = sequelize.define("User", 
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

// create and save a new data
// const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
exports.signUp = (req, res) => {
  // validate request
  if (!req.body) { return res.status(400).send({ message:"Content can not be empty!" }); }
  if (!req.body.email) { return res.status(400).send({ message:"Email can not be empty!" });}
  if (!req.body.name) { return res.status(400).send({ message:"Name can not be empty!" });}
  if (!req.body.password) { return res.status(400).send({ message:"Password can not be empty!" });}
  if (!req.body.gender) { return res.status(400).send({ message:"Gender can not be empty!" });}
  if (!req.body.role) { return res.status(400).send({ message:"Role can not be empty!" });}
  // create a new user
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    role: req.body.role,
    updatedSkriningResult: req.body.updatedSkriningResult,
  };
  console.log(newUser); 
  // save new user in the database
  // Model.create(newUser, (err, data) => {
  Model.create(newUser)
  .then(data => { return res.status(200).send(data); })
  .catch(err => { return res.status(500).send({ message: err.message || "Some error occurred while creating the user."}); });
    //if (err) return res.status(500).send({ message: err.message || "Some error occurred while creating the user." });
    //else return res.status(200).send(data);
  //});
};

// Another way using then and catch
exports.signUp2 = (req, res) => {
  // validate request
  if (!req.body) { return res.status(400).send({ message:"Content can not be empty!" }); }
  if (!req.email) { return res.status(400).send({ message:"Email can not be empty!" });}
  if (!req.name) { return res.status(400).send({ message:"Name can not be empty!" });}
  if (!req.password) { return res.status(400).send({ message:"Password can not be empty!" });}
  // create a new user
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });
  console.log(newUser); 
  // save new user in the database
  User.create(newUser)
  .then(data => { return res.status(200).send(data); })
  .catch(err => { return res.status(500).send({ message: err.message || "Some error occurred while creating the user."}); });
};