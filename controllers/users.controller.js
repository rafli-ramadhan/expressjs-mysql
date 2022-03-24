const User = require("../../models/user.model.js");

// create and save a new data
exports.create = (req, res) => {
  // validate request
  if (!req.body) { return res.status(400).send({ message:"Content can not be empty!" }); }
  if (!req.body.name) { return res.status(400).send({ message:"Name can not be empty!" });}
  if (!req.body.email) { return res.status(400).send({ message:"Email can not be empty!" });}
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
    updatedSkriningResult: "",
  };
  console.log(newUser); 
  // save new user in the database
  User.create(newUser, (err, data) => {
    if (err)
      return res.status(500).send({ message: err.message || "Some error occurred while creating the user." });
    else return res.status(200).send(data);
  });
};
  
// Another way using then and catch
exports.create2 = (req, res) => {
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

// retrieve all user from the database.
exports.getAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      return res.status(500).send({message: err.message || "Some error occurred while retrieving user data."});
    }
    else return res.status(200).send(data);
  });
};

// retrieve all user 2nd version using then and catch
exports.getAll2 = (req, res) => {
  User.getAll()
  .then(data => {
    return res.status(200).send(data);
  })
  .catch(error => {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving user data."
    });
  });
};

// find a user with a user id
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
      } 
      else {
        return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
      }
    } 
    else return res.status(200).send(data);
  });
};

// find a user by id 2nd version using then and catch
exports.findOne2 = (req, res) => {
  User.findById(req.params.userId)
  .then(data => { return res.status(200).send(data);})
  .catch(error => {
    if (err.kind === "not_found") {
      return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
    } 
    else {
      return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
    }
  });
};

// update a user data by the id
exports.update = (req, res) => {
  console.log(req.body);  
  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({message: `User with id ${req.params.userId} not found.`
        });
      } 
      else {
        return res.status(500).send({message: "Error updating User with id " + req.params.userId});
      }
    } 
    else return res.status(200).send(data);
  });
};

// update user data 2nd version using then and catch
exports.update2 = (req, res) => {
  // validate request
  if (!req.body) {return res.status(400).send({message: "Content can not be empty!"});}
  console.log(req.body);
  User.updateById(req.params.userId, new User(req.body))
  .then(data => { return res.status(200).send(data);})
  .catch(error => {
    if (err.kind === "not_found") {
      return res.status(404).send({message: `User with id ${req.params.userId} not found.`});
    } 
    else {
      return res.status(500).send({message: "Error updating User with id " + req.params.userId});
    }
  });
};

// delete user with the specified id
exports.deleteById = (req, res) => {
  User.findByIdAndRemove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
      } 
      else {
        return res.status(500).send({
           message: "Could not delete user with id " + req.params.userId
        });
      }
    } 
    else {
      return res.status(200).send({message: `User was deleted successfully!`});
    }
  });
};

// delete user by id 2nd version using then and catch
exports.deleteById2 = (req, res) => {
  User.remove(req.params.userId)
  .then(data => {
    return res.status(200).send({message: `User was deleted successfully!`});
  }).catch(error => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({message: `Not found user with id ${req.params.userId}.`});
      } 
      else {
        return res.status(500).send({message: "Could not delete user with id " + req.params.userId});
      }
    } 
  });
};

// delete all user from the database
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      return res.status(500).send({message: err.message || "Some error occurred while removing all user."});
    else return res.status(200).send({message: `All user were deleted successfully!` });
  });
};
  
// delete all user 2nd version using then and catch
exports.deleteAll2 = (req, res) => {
  User.removeAll() 
  .then(data => {
    return res.status(200).send({message: `All user were deleted successfully!` });
  })
  .catch(error => {
    return res.status(500).send({message: err.message || "Some error occurred while removing all user."});
  });
};