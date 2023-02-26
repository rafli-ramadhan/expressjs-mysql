module.exports = app => {
  const router = require("express").Router();
  app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome express mysql application." });
  });

  router.post('/register', require('../Controllers/Auth.Controller.js').register);
  router.post('/login', require('../Controllers/Auth.Controller.js').login);
  router.get('/verify', require('../Controllers/Auth.Controller').userAuthorization);
  router.get('/users', require('../Controllers/User.Controller.js').findAll);
  router.get('/users/:id', require('../Controllers/User.Controller.js').findOne);
  router.put('/users/:id', require('../Controllers/User.Controller.js').findOneAndUpdate);
  router.delete('/users/:id', require('../Controllers/User.Controller.js').destroyById);
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
