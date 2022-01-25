const express = require("express");

const app = express();

// cors
const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// mysql connection
require("./config/db.connect.js").sync();

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
