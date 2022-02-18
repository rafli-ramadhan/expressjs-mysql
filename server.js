const express = require("express");

const app = express();

require('dotenv').config();

// cors
const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// mysql connection synchronously
require("./config/db.connect").sync;

// synchronize all models
// This creates the table if it doesn't exist (and does nothing if it already exists)
require('sequelize').sync;
// or sequelize.sync({ force: true } - This creates the table, dropping it first if it already existed
console.log("All models were synchronized successfully.");

// route
app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome express mysql application." }); 
});
require("./routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
