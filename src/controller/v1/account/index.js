const Account = require("../../model").Account

module.exports = {
  Get: async (req, res) => {
      try {
          const users = await Account.TakeById(req.params.id)
          return res.status(200).send(users)
      }
      catch (error) {
          return res.status(500).send({
              message: error.message || 'some error ocurred while retrieving data.',
          });
      }
  },
  GetByIDs: async (req, res) => {
      try {
          const user = await Account.FindById(req.params.id)
          if (!user) throw createError.NotFound('Account not found')
          return res.status(200).send(user);
      }
      catch (err) {
          if(err.kind === 'ObjectId') 
              return res.status(404).send({ message: 'data not found with id ' + req.params.id });
          return res.status(500).send({ message: 'error retrieving data with id ' + req.params.id });
      }
  },
  Register: async (req, res, next) => {
    try {
      const body = await registerSchema.validateAsync(req.body)
      const doesExist = await User.TakeByID(req.body.email)
      if (doesExist)
        throw createError.Conflict(`${body.email} is already been registered`)
      
      const user = new User(body)
      // hash password asynchronously
      // const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(user.password, salt)
      user.password = hashedPassword
      const savedUser = await Create(user)

      const accessToken = await signAccessToken(savedUser.id)

      return res.status(200).send({ 
        message: 'success',
        token: accessToken,
      })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },
  Update: (req, res) => {
    Account.TakeByID(req.params.id)
    .then(currentData => {
      let {newName, newEmail, newPassword, newGender, newRole, newUpdatedScreeningResult} = '';
      if (!req.body.name) { newName = currentData.name}
      if (!req.body.email) { newEmail = currentData.email}
      if (!req.body.password) { newPassword = currentData.password}
      if (!req.body.gender) { newGender = currentData.gender}
      if (!req.body.role) { newRole = currentData.role}
      if (!req.body.updatedScreeningResult) { newUpdatedScreeningResult = currentData.updatedScreeningResult}
      if (req.body.name) { newName = req.body.name}
      if (req.body.email) { newEmail = req.body.email}
      if (req.body.password) { newPassword = req.body.password}
      if (req.body.gender) { newGender = req.body.gender}
      if (req.body.role) { newRole = req.body.role}
      if (req.body.updatedScreeningResult) { newUpdatedScreeningResult = req.body.updatedScreeningResult}

      const newData =
      {
        name: newName,
        email: newEmail,
        password: newPassword,
        gender: newGender,
        role: newRole,
        updatedScreeningResult: newUpdatedScreeningResult,
      }

      Account.Update(req.params.id, newData)
      .then(num => {
        if (num == 1) {
          return res.status(200).send({message: "Account was updated successfully."});
        } 
        else {
          return res.status(500).send({message: `Cannot update user data with id=${id}.`});
        }
      })
      .catch(error => {
        if (error.kind === "not_found") {
          return res.status(404).send({
            message: `Account with id ${req.params.userId} not found.`
          });
        } 
        else {
          return res.status(500).send({
            message: error.message || "Error updating Account with id " + req.params.userId
          });
        }
      });
    })
    .catch(error => {
      return res.status(500).send({message: error.message}); 
    });
  },
  Delete: (req, res) => {
    try {
        Account.Delete(req.param.id).then(() => {
            return res.status(200).send({ message: 'data deleted successfully!' });
        })
    }
    catch (err) {
        if(err.kind === 'not found')
            return res.status(404).send({ message: 'data not found with id ' + req.params.id, });
        return res.status(500).send({ message: 'could not delete data with id ' + req.params.id, });
    };
  }
};
