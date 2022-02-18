// Assign Register, Authentication and Authorization Controller in an Array
const AuthController = [
  require("../controllers/auth/newuser.signup.controller.js").signUp,
  require("../controllers/auth/user.signin.controller.js").signIn,
];

// Assign CRUD(Create, Read, Update and Delete) Controller in an Array
const CrudController = [
  // require("../controllers/admin/create.controller.js").create,
  // require("../controllers/admin/readAll.controller.js").getAll,
  // require("../controllers/admin/readById.controller.js").findOne,
  // require("../controllers/admin/updateById.controller.js").update,
  // require("../controllers/admin/deleteAll.controller.js").deleteAll,
  // require("../controllers/admin/deleteById.controller.js").deleteById,
]

module.exports = app => {

  // User sign up
  app.post("/api/register", AuthController[0]);
  
  // User sign in
  app.post("/api/login", AuthController[1]);

  // Create a new Customer
  // app.post("/user", CrudController[0]);

  // Retrieve all Customers
  // app.get("/user", CrudController[1]);

  // Retrieve a single Customer with customerId\
  // app.get("/user/:userId", CrudController[2]);

  // Update a Customer with customerId
  // app.put("/user/:userId", CrudController[3]);

  // Delete a Customer with customerId
  // app.delete("/user/:userId", CrudController[4]);

  // Delete All
  // app.delete("/user", CrudController[5]);

};
