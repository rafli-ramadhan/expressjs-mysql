const User = require("../config/sequelize.connect").User;
const bcrypt = require('bcrypt');

exports.newUser = (req, res) => {
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
  (User.create(newUser), (error, data) => {
    if (error)
      return res.status(500).send({ message: error.message || "Some error occurred while creating the user." });
    else return res.status(200).send(data);
  });
};

exports.findAll = (req, res) => {
  (User.findAll(), (error, data) => {
    if (error)
      return res.status(500).send({message: error.message || "Some error occurred while retrieving user data."});
    else return res.status(200).send(data);
  });
};

exports.findOne = (req, res) => {
  console.log(req.params)
  (User.findOne({
    where: {
      id: req.params.id
    }
  }),(error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
      } 
      else {
        return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
      }
    } 
    else return res.status(200).send(data);
  });
};

exports.updateById = (req, res) => {
  console.log(req.body);  
  User.update(req.params.userId, new User(req.body), (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        return res.status(404).send({message: `User with id ${req.params.userId} not found.`});
      } 
      else {
        return res.status(500).send({message: "Error updating User with id " + req.params.userId});
      }
    } 
    else return res.status(200).send(data);
  });
};

exports.destroyById = (req, res) => {
  (User.destroy({
    where: {
      id: req.params.id
    }
  }), (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
      } 
      else {
        return res.status(500).send({message: "Could not delete user with id " + req.params.userId});
      }
    } 
    else {
      return res.status(200).send({message: `User was deleted successfully!`});
    }
  });
};

exports.destroyAll = (req, res) => {
  (User.destroy(), (error, data) => {
    if (error)
      return res.status(500).send({message: error.message || "Some error occurred while removing all user."});
    else return res.status(200).send({message: `All user were deleted successfully!` });
  });
};