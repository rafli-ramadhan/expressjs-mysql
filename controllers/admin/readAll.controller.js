const User = require("../../models/user.model.js");

// Retrieve all user from the database.
exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving user data."
            });
        }
        else return res.status(200).send(data);
    });
};

// Another way using then and catch
exports.getAll2 = (req, res) => {
    User.getAll().then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving user data."
        });
    });
};