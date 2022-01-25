const User = require("../../models/user.model.js");

// create and save a new data
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        return res.status(400).send({ message:"Content can not be empty!" });
    }
    // create a new user
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });
  
    // save new user in the database
    User.create(newUser, (err, data) => {
        if (err)
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        else return res.status(200).send(data);
    });
};

// Another way using then and catch
exports.create2 = (req, res) => {
    // validate request
    if (!req.body) {
        return res.status(400).send({ message:"Content can not be empty!" });
    }
    // create a new user
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });
  
    // save new user in the database
    User.create(newUser).then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};