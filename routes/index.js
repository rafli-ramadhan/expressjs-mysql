module.exports = app => {
  const router = require("express").Router();
  // index
  app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome express mysql application." });
  });
  // sign up new user
  router.post('/register', require('../Controllers/Auth.Controller.js').register);
  // sign in (user authentication)
  router.post('/login', require('../Controllers/Auth.Controller.js').login);
  // verify token (user authorization)
  router.get('/verify', require('../Controllers/Auth.Controller').userAuthorization);
  // read all user data
  router.get('/users', require('../Controllers/User.Controller.js').findAll);
  // read user data by id
  router.get('/users/:id', require('../Controllers/User.Controller.js').findOne);
  // update user data by id
  router.put('/users/:id', require('../Controllers/User.Controller.js').findOneAndUpdate);
  // delete user data by id
  router.delete('/users/:id', require('../Controllers/User.Controller.js').destroyById);
  // delete all user data
  router.delete('/users', require('../Controllers/User.Controller.js').destroyAll);

  app.use('/api', router)

  app.use(async (req, res, next) => {
    next(createError.NotFound())
  })
  
  app.use((err, req, res, next) => {
    if (err.isJoi === true) {
      return res.status(err.status || 500).send({
        message: "Validation error",
        error: err.message
      })
    }
    else {
      return res.status(err.status || 500).send({
        error: err.message
      })
    }
  })

};
