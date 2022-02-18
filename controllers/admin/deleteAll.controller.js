const User = require("../../models/user.model.js");

// Delete all user from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            return res.status(500).send({
            message:
                err.message || "Some error occurred while removing all user."
            });
        else return res.status(200).send({ message: `All user were deleted successfully!` });
    });
};

// Another way using then and catch
exports.deleteAll2 = (req, res) => {
    User.removeAll() 
    .then(data => {
        return res.status(200).send({ message: `All user were deleted successfully!` });
    })
    .catch(err => {
        return res.status(500).send({
        message:
            err.message || "Some error occurred while removing all user."
        });        
    });
};