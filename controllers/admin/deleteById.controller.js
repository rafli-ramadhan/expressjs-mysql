const User = require("../../models/user.model.js");

// Delete a user with the specified userId in the request
exports.deleteById = (req, res) => {
    User.findByIdAndRemove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete user with id " + req.params.userId
                });
            }
        } 
        else {
            return res.status(200).send({ 
                message: `User was deleted successfully!` 
            });
        }
    });
};

// Another way using then and catch
exports.deleteById2 = (req, res) => {
    User.remove(req.params.userId).then(data => {
        return res.status(200).send({ 
            message: `User was deleted successfully!` 
        });
    }).catch(err => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete user with id " + req.params.userId
                });
            }
        } 
    });
};