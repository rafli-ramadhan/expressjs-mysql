module.exports = app => {
  const router = require("express").Router();
  // sign up
  router.post("/register", require("../controllers/auth/newuser.signup.controller.js").signUp);
  // sign in (authentication)
  router.post("/login", require("../controllers/auth/user.signin.controller.js").signIn);
  // authorization

  // retrieve all users
  router.get("/users", require("../controllers/users.controller.js").getAll);
  // retrieve a single user by id
  router.get("/users/:userId", require("../controllers/users.controller.js").findOne);
  // update a user by id
  router.put("/users/:userId", require("../controllers/users.controller.js").update);
  // delete a user by id
  router.delete("/users/:userId", require("../controllers/users.controller.js").deleteAll);
  // delete All
  router.delete("/users", require("../controllers/users.controller.js").deleteById);

  app.use('/api', router)
};
