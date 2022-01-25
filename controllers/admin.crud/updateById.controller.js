const User = require("../../models/user.model.js");

// Update a user by the userId
exports.update = (req, res) => {
    // validate request
    if (!req.body) { 
        return res.status(400).send({message: "Content can not be empty!"}); 
    }
    console.log(req.body);
  
    User.updateById(req.params.userId, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `User with id ${req.params.userId} not found.`
                });
            } else {
                return res.status(500).send({
                    message: "Error updating User with id " + req.params.userId
                });
            }
        } 
        else return res.status(200).send(data);
    });
};

// Another way using then and catch
exports.update2 = (req, res) => {
    // validate request
    if (!req.body) { 
      return res.status(400).send({message: "Content can not be empty!"});
    }
    console.log(req.body);
  
    User.updateById(req.params.userId, new User(req.body)).then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        if (err.kind === "not_found") {
            return res.status(404).send({
                message: `User with id ${req.params.userId} not found.`
            });
        } 
        else {
            return res.status(500).send({
                message: "Error updating User with id " + req.params.userId
            });
        }
    });
};