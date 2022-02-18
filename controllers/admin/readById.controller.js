const User = require("../../models/user.model.js");

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            }
        } else return res.status(200).send(data);
    });
};

// Another way using then and catch
exports.findOne2 = (req, res) => {
    User.findById(req.params.userId).then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        if (err.kind === "not_found") {
            return res.status(404).send({
                message: `Not found user with id ${req.params.userId}.`
            });
        } 
        else {
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        }
    });
};